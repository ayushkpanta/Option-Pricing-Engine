
#include <iostream>
#include "models.h"

/**
 * @brief Entry point for the options pricing engine. Currently only hosts an example for pricing using the Black-Scholes model.
 */
int main() {

    // Initialize model
    BlackScholesModel black_scholes;

    // Test parameters
    double S = 100.0;
    double X = 95.0;
    double sigma = 0.75;
    double r = 0.05;
    double T = 1.0 / 12.0;

    // Price basic calls and put @ strike of 95.00
    std::cout << "Call Price: " << black_scholes.price_call(S, X, sigma, r, T) << "\n";
    std::cout << "Put Price: " << black_scholes.price_put(S, X, sigma, r, T) << "\n";
    
    return 0;
}
