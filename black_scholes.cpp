
#include <iostream>
#include "utils.h"
#include "models.h"

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
