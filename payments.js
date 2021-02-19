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
    try {
          if (window.getDigitalGoodsService) {
             service = await window.getDigitalGoodsService(PAYMENT_METHOD);
             details = await service.getDetails([sku]);
             log(JSON.stringify(details, null, 2)); 
          } else {
             log("window doesn't have getDigitalGoodsService."); 
          }
    } catch (error) {
        log(error);
    }
}

