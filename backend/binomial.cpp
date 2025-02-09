
#include <iostream>
#include "models.h"
#include <vector>
#include <tuple>
#include <string>
#include "utils.h"
#include "Eigen/Dense"

BinomialModel::BinomialModel()
{
    std::cout << "Initialized Binomial Model.\n";
}

double BinomialModel::price_contract(double S, double X, double sigma, double r, double T, double N, std::string type, std::string style)
{

    // Get timestep and discount rate
    double dt = T / N;
    double discount_rate = std::exp(-r * dt);

    // Calculate up/down factors and risk-neutral probabilities
    double u = std::exp(sigma * std::sqrt(dt));
    double d = 1.0 / u;
    double p_u = (std::exp(r * dt) - d) / (u - d);
    double p_d = 1 - p_u;

    // Computing stock prices at maturity
    std::vector<double> stock_prices(N + 1, 0.0);
    for (int i = 0; i <= N; i++)
    {
        stock_prices[i] = S * std::pow(d, N - i) * std::pow(u, i);
    }

    // Computing options prices at maturity (intrinsic values)
    std::vector<double> contract_value(N + 1, 0.0);
    for (int i = 0; i <= N; i++)
    {

        // Spot - Strike if CALL, vice versa if PUT
        if (type == "CALL")
        {
            contract_value[i] = std::max(stock_prices[i] - X, 0.0);
        }
        else if (type == "PUT")
        {
            contract_value[i] = std::max(X - stock_prices[i], 0.0);
        }
    }

    // Backwards induction through tree
    for (int i = N - 1; i >= 0; i--)
    {
        for (int j = 0; j <= i; j++)
        {

            // Compute the value we get from waiting to exercize the contract
            double continuation_value = discount_rate * (p_u * contract_value[j + 1] + p_d * contract_value[j]);

            // If American...
            if (style == "AMERICAN")
            {

                // Compute the intrinsic value from immediately exercizing the contract
                double intrinsic_value;
                if (type == "CALL")
                {
                    intrinsic_value = std::max(stock_prices[j] - X, 0.0);
                }
                else if (type == "PUT")
                {
                    intrinsic_value = std::max(X - stock_prices[j], 0.0);
                }

                // Select the maximum value
                contract_value[j] = std::max(intrinsic_value, continuation_value);

                // For European, we must wait
            }
            else if (style == "EUROPEAN")
            {
                contract_value[j] = continuation_value;
            }
        }
    }

    // Return contract value at the root of the binomial tree
    return contract_value[0];
}

std::vector<std::vector<double>> BinomialModel::compute_pnl(double S_curr, double S_min, double S_max, double X, double sigma, double r, double T, double N, std::string type, std::string style)
{

    // Initialize a 2d vector for PNL
    std::vector<std::vector<double>> pnl_matrix;

    // Get premium
    double premium = price_contract(S_curr, X, sigma, r, T / 365.0, N, type, style);

    // Loop through timesteps per price
    for (double spot_price = S_min; spot_price <= S_max; spot_price++)
    {

        // Initialize vector per spot_price
        std::vector<double> row_vec;

        for (double dte = T; dte >= 0; dte--)
        {

            // Compute PNL and % change for contract
            double pnl = price_contract(spot_price, X, sigma, r, dte / 365.0, dte, type, style) - premium;
            double pct = (pnl / premium) * 100.0;

            // Add to vector
            row_vec.push_back(pnl);
        }

        // Add vector to 2d vector
        pnl_matrix.push_back(row_vec);
    }

    // Show and display
    display_matrix(pnl_matrix);
    return pnl_matrix;
}
