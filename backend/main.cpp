
#include <iostream>
#include <cmath>
#include "models.h"
#include "utils.h"
#include <vector>

/**
 * @brief Entry point for the options pricing engine. Currently only hosts examples pricings using the Black-Scholes and Binomial models, as well as a PNL matrix using Black-Scholes.
 */
int main()
{

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
    double N = 30.0;

    // Basic pricing using Black-Scholes for European-style contracts
    std::cout << "Black-Scholes:\n";
    std::cout << "Call Price: " << black_scholes.price_contract(S, X, sigma, r, T, "CALL") << "\n";
    std::cout << "Put Price: " << black_scholes.price_contract(S, X, sigma, r, T, "PUT") << "\n\n";

    // Basic pricing using Binomial for American vs. European-style contracts
    std::cout << "Binomial:\n";
    std::cout << "Call Price (AMERICAN): " << binomial.price_contract(S, X, sigma, r, T, N, "CALL", "AMERICAN") << "\n";
    std::cout << "Call Price (EUROPEAN): " << binomial.price_contract(S, X, sigma, r, T, N, "CALL", "EUROPEAN") << "\n";
    std::cout << "Put Price (AMERICAN): " << binomial.price_contract(S, X, sigma, r, T, N, "PUT", "AMERICAN") << "\n";
    std::cout << "Put Price (EUROPEAN): " << binomial.price_contract(S, X, sigma, r, T, N, "PUT", "EUROPEAN") << "\n\n";

    // Basic PNL display
    std::cout << "PNL Matrix for Long Options using Black-Scholes" << "\n";

    // request user input
    double S_curr;
    double S_min;
    double S_max;
    double X_tst;
    double T_tst = 10.0;
    double N_tst = 10.0;
    std::cout << "Please enter the requested data:" << "\n";
    std::cout << "Current spot price: ";
    std::cin >> S_curr;
    std::cout << "Minimum spot price: ";
    std::cin >> S_min;
    std::cout << "Maximum spot price: ";
    std::cin >> S_max;
    std::cout << "Strike price: ";
    std::cin >> X_tst;
    // std::cout << "Underlying asset volatility: ";
    // std::cin >> sigma;
    // std::cout << "Risk-free rate of return: ";
    // std::cin >> r;
    // std::cout << "Days until expiration: ";
    // std::cin >> T;
    // std::cout << "Timesteps: ";
    // std::cin >> N;

    // Compute long call pnl
    std::cout << "\n"
              << "Long Call PNL:" << "\n";
    std::vector<std::vector<double>> pnl_long_call_bsm = black_scholes.compute_pnl(S_curr, S_min, S_max, X_tst, sigma, r, T_tst, "CALL");

    // Compute long put pnl
    std::cout << "\n"
              << "Long Put PNL:" << "\n";
    std::vector<std::vector<double>> pnl_long_put_bsm = black_scholes.compute_pnl(S_curr, S_min, S_max, X_tst, sigma, r, T_tst, "PUT");

    std::cout << "\n";
    // Basic PNL display
    std::cout << "PNL Matrix for Long Options (American) using Binomial" << "\n";

    // Compute long call pnl
    std::cout << "\n"
              << "Long Call PNL:" << "\n";
    std::vector<std::vector<double>> pnl_long_call_bm = binomial.compute_pnl(S_curr, S_min, S_max, X_tst, sigma, r, T_tst, N_tst, "CALL", "AMERICAN");

    // Compute long put pnl
    std::cout << "\n"
              << "Long Put PNL:" << "\n";
    std::vector<std::vector<double>> pnl_long_put_bm = binomial.compute_pnl(S_curr, S_min, S_max, X_tst, sigma, r, T_tst, N_tst, "PUT", "AMERICAN");

    std::cout << "\n";
    return 0;
}
