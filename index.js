/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const data = {
  en: [
    'In the Middle Ages, monks copied books by hand, a task that could take years to complete a single volume.',
    'The word "book" comes from the Latin "liber," which means the inner bark of trees, where writing was done in ancient times.',
    'In many cultures, access to books and literacy is a rite of passage towards education and knowledge.',
    'The scrolls and codices used by the ancient Romans and Greeks are precursors to modern books.',
    'The first known public library was established in the city of Nineveh, in the ancient Assyrian Empire.',
    'During World War II, many libraries in Europe were destroyed or severely damaged, losing countless historical volumes.',
    'There are books written with invisible ink that can only be read under ultraviolet light.',
    'The restoration of ancient books is possible, but it can be a long and delicate process, requiring specialized techniques.',
  ],
  es: [
    'En la Edad Media, los monjes copiaban libros a mano, labor que podía llevar años para completar un solo volumen.',
    'La palabra "libro" proviene del latín "liber," que significa la parte interior de la corteza de los árboles, donde se escribía en tiempos antiguos.',
    'En muchas culturas, el acceso a los libros y la alfabetización es un rito de paso hacia la educación y el conocimiento.',
    'Los pergaminos y códices usados por los antiguos romanos y griegos son precursores de los libros modernos.',
    'La primera biblioteca pública conocida fue establecida en la ciudad de Nínive, en el antiguo imperio asirio.',
    'Durante la Segunda Guerra Mundial, muchas bibliotecas en Europa fueron destruidas o gravemente dañadas, perdiéndose innumerables volúmenes históricos.',
    'Existen libros escritos con tinta invisible que solo pueden leerse bajo luz ultravioleta.',
    'La restauración de libros antiguos es posible, pero puede ser un proceso largo y delicado, que requiere técnicas especializadas.'
  ]
};

const languageStrings = {  
en: {
    translation: {
      GET_FRASES_MSG: 'Something curious about boocks is that these...',
      GET_FRASES_MSGSalida: '... you can ask for another fun fact... say "tell me a fun fact about the boocks" ... or if you want to stop me just say, Cancel! ...so...how can I help you?',

      WELCOME_MESSAGE: 'Welcome to curiosities university books, you can say Hello or Help. Which would you like to try?',
      HELLO_MESSAGE: 'Hello curiosities university books!',
      HELP_MESSAGE: 'You can say hello to me! How can I help?',
      GOODBYE_MESSAGE: 'Goodbye!',
      REFLECTOR_MESSAGE: 'You just triggered  Jeziel %s',
      FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again',
      ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
      
    }
},

es: {
    translation: {
      GET_FRASES_MSG: 'Un dato interesante de los libros es que...',
      GET_FRASES_MSGSalida: '... puedes pedir otro dato curioso... di "dime un dato curioso de libros" ... o si deseas detenerme solo di, ¡Cancela! ... entonces ... ¿cómo te puedo ayudar?',
      WELCOME_MESSAGE: 'Bienvenido a curiosidades libros universidad, puedes decir Hola o Ayuda. Cual prefieres?',
      HELLO_MESSAGE: 'Hola a curiosidades libros universidad!',
      HELP_MESSAGE: 'Puedes decirme hola. Cómo te puedo ayudar?',
      GOODBYE_MESSAGE: 'Adiós!',
      REFLECTOR_MESSAGE: 'Acabas de activar Jeziel %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.'
    }
}
}



const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CuriosidadesIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CuriosidadesIntent';
  },
  handle(handlerInput) {
    const locale = handlerInput.requestEnvelope.request.locale;
    const language = locale.substring(0, 2);
    const frasesArray = data[language] || data['en'];  // default to English if the language is not supported
    const frasesIndice = Math.floor(Math.random() * frasesArray.length);
    const randomFrase = frasesArray[frasesIndice];
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const PrimerMsg = requestAttributes.t('GET_FRASES_MSG');
    const MsgSalida = requestAttributes.t('GET_FRASES_MSGSalida');
    const speakOutput = `${PrimerMsg} ${randomFrase}${MsgSalida}`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
         const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t(`REFLECTOR_MESSAGE ${intentName}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CuriosidadesIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
        .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();