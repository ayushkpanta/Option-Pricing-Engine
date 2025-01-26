
#include <iostream>
#include "utils.h"
#include "models.h"
#include <vector>

// Constructor: flagging that the model is initialized
BlackScholesModel::BlackScholesModel(){
    std::cout << "Initialized Black-Scholes Model.\n";
}

// Calculating option price
double BlackScholesModel::price_contract(double S, double X, double sigma, double r, double T, std::string type) {

    // Compute sub-parameters
    double d1 = compute_d1(S, X, sigma, r, T);
    double d2 = compute_d2(d1, sigma, T);

    // Compute price based on contract type
    double price;
    if (type == "CALL") {
        price = S * normCDF(d1) - X * std::exp(-r * T) * normCDF(d2);
    } else if (type == "PUT") {
        price = X * std::exp(-r * T) * normCDF(-d2) - S * normCDF(-d1);
    }
    return price;
 }

 // Internal computations 
 double BlackScholesModel::compute_d1(double S, double X, double sigma, double r, double T) {
    return (std::log(S/X) + (r + (0.5 * std::pow(sigma, 2)))) / (sigma * std::sqrt(T));
}
double BlackScholesModel::compute_d2(double d1, double sigma, double T) { 
    return d1 - sigma * std::sqrt(T);
}


// Generate PNL matrix
std::vector<std::vector<double> > BlackScholesModel::compute_pnl(double S_curr, double S_min, double S_max, double X, double sigma, double r, double T, std::string type) {

    // Initialize a 2d vector for PNL
    std::vector<std::vector<double> > pnl_matrix;

    // Get premium
    double premium = price_contract(S_curr, X, sigma, r, T, type);

    // Loop through timesteps per price
    for (double spot_price = S_min; spot_price <= S_max; spot_price++) {

        // Initialize vector per spot_price
        std::vector<double> row_vec;

        for (double dte = T; dte >= 0; dte--) {

            // Compute PNL and % change for contract
            double pnl = price_contract(spot_price, X, sigma, r, dte, type) - premium;
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
