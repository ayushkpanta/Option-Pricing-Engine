
#ifndef MODELS_H
#define MODELS_H

/**
 * @brief Model for pricing European-style options using the Black-Scholes formula.
 * 
 * This class provides functionality for calculating the prices of call and put options based on the Black-Scholes model. This handles Eurpoean-style options, which only allow an option contract to be executed at expiration.
 * 
 * Below is a snippet that shows how the model may be used.
 * @code
 * BlackScholesModel bsm;
 * double call_price = bsm.price_contract(S, X, sigma, r, T, type="CALL");
 * @endcode
 */
class BlackScholesModel {

    public:
        BlackScholesModel();
        /**
         * @brief Computes the price of a European option using the Black-Scholes model.
         * 
         * @param S The current spot price of the underlying asset.
         * @param X The strike price of the selected option.
         * @param sigma The annualized volatility of the underlying asset.
         * @param r The annualized risk-free interest rate.
         * @param T The time to maturity in years.
         * @param type The type of contract ("CALL" or "PUT").
         * @return The price of the call option.
         */
        double price_contract(double S, double X, double sigma, double r, double T, std::string type);
    private:
        // Internal compuations
        double compute_d1(double S, double X, double sigma, double r, double T);
        double compute_d2(double d1, double sigma, double T);
};


/**
 * @brief Model for pricing both American and European-style options using the Binomial formula.
 * 
 * This class provides functionality for calculating the prices of call and put options based on the Binomial model. 
 * 
 * Below is a snippet that shows how the model may be used.
 * @code
 * BinomialModel bm;
 * double american_call_price = bm.price_contract(S, X, sigma, r, T, N, type="CALL", style="AMERICAN");
 * @endcode
 */
class BinomialModel {

    public:
        BinomialModel();
        /**
         * @brief Computes the price of an option using the Black-Scholes model.
         * 
         * @param S The current spot price of the underlying asset.
         * @param X The strike price of the selected option.
         * @param sigma The annualized volatility of the underlying asset.
         * @param r The annualized risk-free interest rate.
         * @param T The time to maturity in years.
         * @param N The number of timesteps in the binomal tree.
         * @param type The type of contract ("CALL" or "PUT").
         * @param style The style of option ("AMERICAN" or "EUROPEAN").
         * @return The price of the call option.
         */
        double price_contract(double S, double X, double sigma, double r, double T, double N, std::string type, std::string style);
};

#endif
