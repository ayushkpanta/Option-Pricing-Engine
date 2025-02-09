
#include <iostream>
#include <cmath>
#include "models.h"
#include "utils.h"
#include <vector>
#include "crow_all.h"
#include "json.hpp"

/**
 * @brief Entry point for the options pricing engine. Currently only hosts examples pricings using the Black-Scholes and Binomial models, as well as a PNL matrix using Black-Scholes.
 */
int main()
{

    // init app
    crow::SimpleApp app;

    // init json parser
    using json = nlohmann::json;

    // init models
    BlackScholesModel black_scholes;
    BinomialModel binomial;

    // POST
    CROW_ROUTE(app, "/pricer_backend").methods("POST"_method) ([&black_scholes, &binomial]( const crow::request& request) {

            // parse the json
            auto input = json::parse(request.body);

            // parse all fields (doesnt matter)
            std::string model = input["model"].get<std::string>();
            double S = input["spot"].get<double>();
            double X = input["strike"].get<double>();
            double sigma = input["volatility"].get<double>();
            double r = input["riskFreeRate"].get<double>();
            double T = input["timeToExpiration"].get<double>();
            double N = input["timesteps"].get<double>();
            double S_l = input["priceLow"].get<double>();
            double S_h = input["priceHigh"].get<double>();
            std::string style = input["style"].get<std::string>();

            // declare vars
            double call;
            double put;
            std::vector<std::vector<double>> call_spread;
            std::vector<std::vector<double>> put_spread;

            // pass params according to model
            if (model == "BLACK-SCHOLES") {

                // price calls and puts
                call = black_scholes.price_contract(S, X, sigma, r, T, "CALL");
                put = black_scholes.price_contract(S, X, sigma, r, T, "PUT");

                // get spreads
                call_spread = black_scholes.compute_pnl(S, S_l, S_h, X, sigma, r, T, "CALL");
                put_spread = black_scholes.compute_pnl(S, S_l, S_h, X, sigma, r, T, "PUT");

            } else if (model == "BINOMIAL") {

                // price calls and puts
                call = binomial.price_contract(S, X, sigma, r, T, N, "CALL", style);
                put = binomial.price_contract(S, X, sigma, r, T, N, "PUT", style);

                // get spreads
                call_spread = binomial.compute_pnl(S, S_l, S_h, X, sigma, r, T, N, "CALL", style);
                put_spread = binomial.compute_pnl(S, S_l, S_h, X, sigma, r, T, N, "PUT", style);
            }

            // create json
            json response;
            response["call"] = call;
            response["put"] = put;
            response["call_spread"] = call_spread;
            response["put_spread"] = put_spread;

            return crow::response(response.dump());
    });

    // GET just in case
    CROW_ROUTE(app, "/pricer_backend").methods("GET"_method)
    ([]() {
        return "Why are you here? Use POST requests for calculations :p.";
    });
    
    app.port(18080).multithreaded().run();
    return 0;
}
