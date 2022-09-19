const PAYMENT_METHOD = "https://play.google.com/billing";

function buy(sku) {
    if (!window.PaymentRequest) {
        console.log("No PaymentRequest object.");
    }

    const supportedInstruments = [{
        supportedMethods: PAYMENT_METHOD,
        data: {
            sku: sku,
        },
    }];

    const item_details = {
        total: {
            label: "Total",
            amount: {
                currency: "AUD",
                value: "1",
            },
        },
    };

    const request = new PaymentRequest(supportedInstruments, item_details);

    if (request.canMakePayment) {
        request.canMakePayment()
            .then(result => {
                console.log(result ? "Can make payment." : "Cannot make payment.");
            })
            .catch(error => console.error(error.message));
    }

    if (request.hasEnrolledInstrument) {
        request.hasEnrolledInstrument()
            .then(result => {
                console.log(result ? "Has enrolled instrument." : "No enrolled instrument.");

                request.show().then((response) => response.complete('success'));
            })
            .catch(error => console.error(error.message));
    }
}

async function getDetails(sku, log) {
    let startTime = performance.now();
    try {
          if (window.getDigitalGoodsService) {
             service = await window.getDigitalGoodsService(PAYMENT_METHOD);
             let getServiceTime = performance.now();
             details = await service.getDetails([sku]);
             let getGetDetailsTime = performance.now();
             log(`GetDigitalGoodsService took ${getServiceTime - startTime} ms and`,
                     `GetDetails took additional ${getGetDetailsTime - getServiceTime} ms`);
             log(JSON.stringify(details, null, 2)); 
          } else {
             log("window doesn't have getDigitalGoodsService."); 
          }
    } catch (error) {
        log(error);
    }
}

// Time how long Digital Goods Service takes to become available on cold load.
getDetails('android.test.purchased', console.log);
