const { createApp } = Vue

const contacts = [
    {
        name: 'Michele',
        avatar: './img/avatar_1.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Fabio',
        avatar: './img/avatar_2.jpg',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Samuele',
        avatar: './img/avatar_3.jpg',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro B.',
        avatar: './img/avatar_4.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro L.',
        avatar: './img/avatar_5.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ],
    },
    {
        name: 'Claudia',
        avatar: './img/avatar_6.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novità?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Federico',
        avatar: './img/avatar_7.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Davide',
        avatar: './img/avatar_8.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
            }
        ],
    }
];

createApp({

    data() {
        return {
            contacts,
            chatAttiva: 0
        }
    },
    methods: {
        // Tenere traccia della chat su cui l'utente ha cliccato (grazie al suo indice)
        seleziona(quale) {
            console.log("Seleziono la chat con indice: ", quale);
            this.chatAttiva = quale;
        },
        // Invio un nuovo messaggio, costruendo prima il relativo oggetto da pushare
        sendMessage() {
            const miCopioLaConversazioneAttiva = this.chatAttiva; //perchè non uso direttamente chatAttiva?

            this.newMessage(miCopioLaConversazioneAttiva, "Queste sono parole a caso?", "sent");

            window.setTimeout(() => {
                this.newMessage(miCopioLaConversazioneAttiva, "Lorem ipsum dolor sit, amet consectetur adipisicing elit!", "received");
            }, 3000);
        },
        //funzione per ricevere o inviare un messaggio in una specifica chat
        newMessage(conversazione, message, status) {
            const dataAttuale = new Date();

            const nuovoMessaggio = {
                date: dataAttuale.toLocaleDateString() + " " + dataAttuale.toLocaleTimeString("IT-it"),
                message, //---> https://flynn.boolean.careers/exercises/api/random/sentence
                status
            };

            // contacts, all'indice della chat selezionata, nella proprietà con l'array dei messaggi, pusho nuovo messaggio
            this.contacts[conversazione].messages.push(nuovoMessaggio);
        },
        // Rendi visibili solo i contatti il cui nome inizia con "Alessandro"
        // Funziona grazie al v-if sui contatti
        findAlex() {
            for (let i = 0; i < this.contacts.length; i++) {

                const contatto = this.contacts[i];
                const stringaDaCercare = ("aLeSsanDRo").toLowerCase();

                if (contatto.name.toLowerCase().startsWith(stringaDaCercare)) {
                    contatto.visible = true;
                } else {
                    contatto.visible = false;
                }

            }
        },
        // recupero ultimo msg di una chat
        getLastMessage(i) {
            const indiceUltimoMess = this.contacts[i].messages.length - 1;
            const oggettoUltimoMess = this.contacts[i].messages[indiceUltimoMess];
            const orarioUltimoMess = oggettoUltimoMess.date;
            const dateUltimoMess = new Date(orarioUltimoMess);
            // const orarioConvertito = dateUltimoMess.toLocaleTimeString("IT-it");
            const orarioConvertito = dateUltimoMess.getHours() + ":" + dateUltimoMess.getMinutes();
            return orarioConvertito;
        }

    },
    mounted() {
        console.log("App montata");
    }

}).mount('#app');