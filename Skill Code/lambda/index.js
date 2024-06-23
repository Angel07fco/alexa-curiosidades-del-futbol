/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'.
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

// We create a language strings object containing all of our strings. // The keys for each string will then be referenced in our code// e.g. requestAttributes.t('WELCOME')
const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: `Here you will discover fascinating facts about the king of sports. You can say "tell me a curiosity about the king of sports" to get started, or "Help" if you need more information. What would you like to do?`,
            HELP_MESSAGE: `I'm here to surprise you with facts about the king of sports, soccer! You can say "tell me a curiosity about the king of sports" to hear an interesting fact, or just say Help. Say "Help", how can I help you?`,
            GOODBYE_MESSAGE: 'See you later! I hope you enjoyed learning about soccer. Come back soon to discover more curiosities',
            REFLECTOR_MESSAGE: 'You just triggered %s',
            FALLBACK_MESSAGE: `Sorry, I have no information about that. But I can tell you something interesting about soccer if you prefer. Would you like to hear a curiosity about the king of sports?`,
            ERROR_MESSAGE: 'Oops! Something seems to have gone wrong. Please try again. In the meantime, would you like me to tell you a curiosity about the king of sports?',
            GET_FRASES_MSG: 'A curious fact is ...',
            GET_FRASES_MSG2: '..., you can ask for another fun fact ... or tell me a fun fact about the king of sports ... or, if you want to stop me just say, Cancel! ... so how can I help you?',
            FOOTBALL_FACTS: [
                'The first FIFA World Cup was held in Uruguay in 1930, and the host nation won the tournament.',
                'Football is the most popular sport in the world, with over 4 billion followers.',
                'The football match with the most goals in history ended 149-0. It was a protest match in Madagascar in 2002.',
                'Real Madrid is the club with the most Champions League titles, having won the trophy 14 times.',
                'The fastest goal in World Cup history was scored by Hakan Şükür of Turkey in just 11 seconds in 2002.',
                'The Maracanã Stadium in Brazil is famous for hosting the largest attendance at a football match: approximately 200,000 people in 1950.',
                'Cristiano Ronaldo is the first player to score in 5 different World Cups (2006, 2010, 2014, 2018, and 2022).',
                'Lionel Messi is the only player in history to have won the Ballon d\'Or 7 times.',
                'The longest goal in an official match was scored from 91.9 meters by goalkeeper Tom King in 2021.',
                'In 1998, FIFA recognized Pelé and Diego Maradona as the best players of the 20th century in a joint ceremony.'
            ]
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: `Bienvenido a Curiosidades del rey de los deportes el fútbol. Aquí descubrirás datos fascinantes sobre el deporte rey. Puedes decir "dime una curiosidad del rey de los deportes" para empezar, o "Ayuda" si necesitas más información. ¿Qué te gustaría hacer?`,
            HELP_MESSAGE: `¡Estoy aquí para sorprenderte con datos sobre el rey de los deportes el futbol! Puedes decir "dime una curiosidad del rey de los deportes" para escuchar un dato interesante, o simplemente decir Ayuda. ¿En qué te puedo ayudar?`,
            GOODBYE_MESSAGE: '¡Hasta luego! Espero que hayas disfrutado aprendiendo sobre fútbol. Vuelve pronto para descubrir más curiosidades',
            REFLECTOR_MESSAGE: 'Acabas de activar %s',
            FALLBACK_MESSAGE: `Lo siento, no tengo información sobre eso. Pero puedo contarte algo interesante sobre el fútbol si lo prefieres. ¿Te gustaría escuchar una curiosidad del rey de los deportes?`,
            ERROR_MESSAGE: '¡Ups! Parece que algo salió mal. Por favor, inténtalo de nuevo. Mientras tanto, ¿quieres que te cuente una curiosidad del rey de los deportes?',
            GET_FRASES_MSG: 'Un dato curioso es ...',
            GET_FRASES_MSG2: '..., puedes pedir otro dato curioso... o dime un dato curioso del rey de los deportes ... o, si deseas detenerme solo di, ¡Cancela! ... entonces ¿cómo te puedo ayudar?',
            FOOTBALL_FACTS: [
                'El primer Mundial de Fútbol se celebró en Uruguay en 1930 y fue ganado por el país anfitrión.',
                'El fútbol es el deporte más popular del mundo, con más de 4 mil millones de seguidores.',
                'El partido de fútbol con más goles en la historia terminó 149-0. Fue en un juego de protesta en Madagascar en 2002.',
                'El club con más títulos de la Champions League es el Real Madrid, con 14 trofeos.',
                'El gol más rápido en la historia de los Mundiales lo marcó Hakan Şükür de Turquía en solo 11 segundos en 2002.',
                'El Estadio Maracaná en Brasil es conocido por haber tenido la mayor asistencia a un partido de fútbol: aproximadamente 200,000 personas en 1950.',
                'Cristiano Ronaldo es el primer jugador en marcar en 5 Mundiales diferentes (2006, 2010, 2014, 2018 y 2022).',
                'Lionel Messi es el único jugador en la historia que ha ganado el Balón de Oro 7 veces.',
                'El gol más lejano en un partido oficial fue anotado desde 91.9 metros por el portero Tom King en 2021.',
                'En 1998, la FIFA reconoció a Pelé y Diego Maradona como los mejores jugadores del siglo XX en una ceremonia conjunta.'
            ]
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

const FrasesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const footballFacts = requestAttributes.t('FOOTBALL_FACTS');
        const randomIndex = Math.floor(Math.random() * footballFacts.length);
        const randomFact = footballFacts[randomIndex];
        const speakOutput = requestAttributes.t('GET_FRASES_MSG') + randomFact + requestAttributes.t('GET_FRASES_MSG2');

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
        const speakOutput = 'You can say hello to me! How can I help?';

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
        const speakOutput = 'Goodbye!';

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
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

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
        const speakOutput = `You just triggered ${intentName}`;

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
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will log all incoming requests to this lambda
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
        FrasesIntentHandler,
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