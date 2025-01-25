
#include <iostream>
#include "models.h"
#include <vector>
#include <tuple>
#include <string>
#include "Eigen/Dense"

BinomialModel::BinomialModel() {
    std::cout << "Initialized Binomial Model.\n";
}

double BinomialModel::price_contract(double S, double X, double sigma, double r, double T, double N, std::string type) {

    // Get timesep and discount rate
    double dt = T / N;
    double discount_rate = std::exp(-r * dt);

    // Calculate up/down factors and risk-neutral probabilities
    double u = std::exp(sigma * std::sqrt(dt));
    double d = 1.0 / u;
    double p_u = (std::exp(r * dt) - d) / (u - d);
    double p_d = 1 - p_u;

    // Computing stock prices at maturity
    std::vector<double> stock_prices(N + 1, 0.0);
    for (int i = 0; i <= N; i++) {
        stock_prices[i] = S * std::pow(d, N-i) * std::pow(u, i);
    }

    // Computing options prices at maturity
    std::vector<double> contract_value(N+1, 0.0);
    for (int i = 0; i <= N; i++) {
        // Spot - Strike if CALL, flip if PUT
        if (type == "CALL") {
            contract_value[i] = std::max(stock_prices[i] - X, 0.0);
        } else if (type == "PUT") {
            contract_value[i] = std::max(X - stock_prices[i], 0.0);
        }
    }

    // Backwards induction through tree
    for (int i = N - 1; i >= 0; i--) {
        for (int j = 0; j <= i; j++) {
            contract_value[j] = discount_rate * (p_u * contract_value[j+1] + p_d * contract_value[j]);
        }
    }

    // Return contract value at the root of the binomial tree
    return contract_value[0];
}
