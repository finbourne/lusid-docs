const http = require('https');
const fs = require('fs');

const download = function (url, dest, cb) {
    var file = fs.createWriteStream(dest);
    http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

const python_tools_base = "https://raw.githubusercontent.com/mneedham/lusid-python-tools/instrument-master/tests/integration/examples"

const files = [
    ["https://raw.githubusercontent.com/mneedham/lusid-sdk-python/readme-refactoring/sdk/examples/hello_world.py",
        "modules/ROOT/examples/getting-started/hello_world.py"],
    ["https://raw.githubusercontent.com/mneedham/lusid-sdk-csharp/master/sdk/Lusid.Sdk.Tests/HelloWorld.cs",
        "modules/ROOT/examples/getting-started/HelloWorld.cs"],
    ["https://raw.githubusercontent.com/mneedham/lusid-sdk-java/add-example/examples/src/main/java/com/finbourne/examples/HelloWorld.java",
        "modules/ROOT/examples/getting-started/HelloWorld.java"],

    [`${python_tools_base}/test_configure_transaction_types.py`,
        "modules/ROOT/examples/transaction-types/test_configure_transaction_types.py"],

    [`${python_tools_base}/lusid_utils.py`,
        "modules/ROOT/examples/lusid_utils.py"],
    [`${python_tools_base}/holdings.py`,
        "modules/ROOT/examples/holdings.py"],

    [`${python_tools_base}/data/test_user_defined_properties/test_output/get_property.csv`,
        "modules/ROOT/examples/user-defined-properties/get_property.csv"],
    [`${python_tools_base}/data/test_user_defined_properties/test_output/portfolio_manager_property.txt`,
        "modules/ROOT/examples/user-defined-properties/portfolio_manager_property.txt"],
    [`${python_tools_base}/test_user_defined_properties.py`,
        "modules/ROOT/examples/user-defined-properties/test_user_defined_properties.py"],

    [`${python_tools_base}/test_identifiers.py`,
        "modules/ROOT/examples/identifiers/test_identifiers.py"],
    [`${python_tools_base}/data/test_identifiers/test_output/identifiers.csv`,
        "modules/ROOT/examples/identifiers/identifiers.csv"],
    [`${python_tools_base}/data/test_identifiers/test_output/other_identifiers.csv`,
        "modules/ROOT/examples/identifiers/other_identifiers.csv"],

    [`${python_tools_base}/data/test_ibor/test_output/transactions.csv`,
        "modules/ROOT/examples/ibor/transactions.csv"],

    [`${python_tools_base}/data/test_ibor/test_output/holdings_set_holdings.csv`,
        "modules/ROOT/examples/ibor/holdings_set_holdings.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings_set_holdings_shk.csv`,
        "modules/ROOT/examples/ibor/holdings_set_holdings_shk.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings_first_day_trading.csv`,
        "modules/ROOT/examples/ibor/holdings_first_day_trading.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings_first_day_trading_shk.csv`,
        "modules/ROOT/examples/ibor/holdings_first_day_trading_shk.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings_funds_loaded.csv`,
        "modules/ROOT/examples/ibor/holdings_funds_loaded.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings_funds_loaded_shk.csv`,
        "modules/ROOT/examples/ibor/holdings_funds_loaded_shk.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings_second_day_trading.csv`,
        "modules/ROOT/examples/ibor/holdings_second_day_trading.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings_second_day_trading_shk.csv`,
        "modules/ROOT/examples/ibor/holdings_second_day_trading_shk.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings_positions.csv`,
        "modules/ROOT/examples/ibor/holdings_positions.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings_positions_shk.csv`,
        "modules/ROOT/examples/ibor/holdings_positions_shk.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings.csv`,
        "modules/ROOT/examples/ibor/holdings.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings_today.csv`,
        "modules/ROOT/examples/ibor/holdings_today.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/holdings_today_shk.csv`,
        "modules/ROOT/examples/ibor/holdings_today_shk.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/quotes.csv`,
        "modules/ROOT/examples/ibor/quotes.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/quotes_with_luid.csv`,
        "modules/ROOT/examples/ibor/quotes_with_luid.csv"],

    [`${python_tools_base}/data/test_ibor/test_output/valuation-20210422.csv`,
        "modules/ROOT/examples/ibor/valuation-20210422.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/valuation-20210421.csv`,
        "modules/ROOT/examples/ibor/valuation-20210421.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/valuation-all.csv`,
        "modules/ROOT/examples/ibor/valuation-all.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/valuation-all-multiple-days.csv`,
        "modules/ROOT/examples/ibor/valuation-all-multiple-days.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/valuation-shk.csv`,
        "modules/ROOT/examples/ibor/valuation-shk.csv"],

    [`${python_tools_base}/data/test_ibor/test_output/get_instrument.csv`,
        "modules/ROOT/examples/ibor/get_instrument.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/get_instrument_client_internal.csv`,
        "modules/ROOT/examples/ibor/get_instrument_client_internal.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/get_instruments.csv`,
        "modules/ROOT/examples/ibor/get_instruments.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/get_instruments_now.csv`,
        "modules/ROOT/examples/ibor/get_instruments_now.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/get_instruments_later.csv`,
        "modules/ROOT/examples/ibor/get_instruments_later.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/get_instruments_properties.csv`,
        "modules/ROOT/examples/ibor/get_instruments_properties.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/instruments.csv`,
        "modules/ROOT/examples/ibor/instruments.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/luids.csv`,
        "modules/ROOT/examples/ibor/luids.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/search_instruments.csv`,
        "modules/ROOT/examples/ibor/search_instruments.csv"],

    [`${python_tools_base}/data/test_ibor/test_output/get_portfolio.csv`,
        "modules/ROOT/examples/ibor/get_portfolio.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/get_new_portfolio.csv`,
        "modules/ROOT/examples/ibor/get_new_portfolio.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/reconciliation.csv`,
        "modules/ROOT/examples/ibor/reconciliation.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/reconciliation_valuation.csv`,
        "modules/ROOT/examples/ibor/reconciliation_valuation.csv"],

    [`${python_tools_base}/data/test_ibor/test_output/transactions.csv`,
        "modules/ROOT/examples/ibor/transactions.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/transactions_response.csv`,
        "modules/ROOT/examples/ibor/transactions_response.csv"],
    [`${python_tools_base}/data/test_ibor/test_output/transactions_filter_response.csv`,
        "modules/ROOT/examples/ibor/transactions_filter_response.csv"],

    [`${python_tools_base}/test_ibor.py`,
        "modules/ROOT/examples/ibor/test_ibor.py"],

    [`${python_tools_base}/data/test_entitlements/entitlements/data-uk-portfolio-manager.json`,
        "modules/ROOT/examples/entitlements/data-uk-portfolio-manager.json"],
    [`${python_tools_base}/data/test_entitlements/entitlements/api-portfolio-managers.json`,
        "modules/ROOT/examples/entitlements/api-portfolio-managers.json"],


    [`${python_tools_base}/test_portfolios.py`,
        "modules/ROOT/examples/portfolios/test_portfolios.py"],

]

const fileTypes = [...Array(21).keys()].flatMap(index => {
    return [
        [`${python_tools_base}/data/test_configure_transaction_types/test_output/transaction_types_${index}.csv`,
            `modules/ROOT/examples/transaction-types/transaction_types_${index}.csv`],
        [`${python_tools_base}/data/test_configure_transaction_types/test_output/movements_${index}.csv`,
            `modules/ROOT/examples/transaction-types/movements_${index}.csv`],
    ]
})

files.concat(fileTypes).forEach(value => {
    const [remote, local] = value
    download(remote, local)
})
