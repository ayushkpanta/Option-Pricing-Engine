
#include <iostream>
#include "models.h"

/**
 * @brief Entry point for the options pricing engine. Currently only hosts an example for pricing using the Black-Scholes and Binomial pricing models.
 */
int main() {

    // Initialize models
    std::cout << "\n";
    BlackScholesModel black_scholes;
    BinomialModel binomial;
    std::cout << "\n";

    // Test parameters for Black-Scholes
    double S = 100.0;
    double X = 95.0;
    double sigma = 0.75;
    double r = 0.05;
    double T = 1.0 / 12.0;

    // Basic pricing using Black-Scholes for European-style contracts
    std::cout << "Black-Scholes:\n";
    std::cout << "Call Price: " << black_scholes.price_contract(S, X, sigma, r, T, "CALL") << "\n";
    std::cout << "Put Price: " << black_scholes.price_contract(S, X, sigma, r, T, "PUT") << "\n\n";

    // Extra test parameter (steps) for Binomial
    double N = 30.0;

    // Basic pricing using Binomial for American vs. European-style contracts
    std::cout << "Binomial:\n";
    std::cout << "Call Price (AMERICAN): " << binomial.price_contract(S, X, sigma, r, T, N, "CALL", "AMERICAN") << "\n";
    std::cout << "Call Price (EUROPEAN): " << binomial.price_contract(S, X, sigma, r, T, N, "CALL", "EUROPEAN") << "\n";
    std::cout << "Put Price (AMERICAN): " << binomial.price_contract(S, X, sigma, r, T, N, "PUT", "AMERICAN") << "\n";
    std::cout << "Put Price (EUROPEAN): " << binomial.price_contract(S, X, sigma, r, T, N, "PUT", "EUROPEAN") << "\n";
    
    std::cout << "\n";
    return 0;
}
