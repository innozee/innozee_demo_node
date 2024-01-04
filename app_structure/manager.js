'use strict'


module.exports = async function (fastify, options, done){

    fastify.get('/room', { websocket: true }, (connection, request) => {
        
        // New Connection 
        connection.socket.send(JSON.stringify({ action: 'Welcome',message:'Hi New Client - your connected successfully'}));
        console.log('----- new Client Connected - form server - InnoZee');  

        // On Message
        connection.socket.on('message', (message_Txt) => {
            
            //Convert To Json to Object
            let socket = connection.socket;
            let parsed_Txt;
            try {
                parsed_Txt = JSON.parse(message_Txt);
            } catch (error) {
                socket.send(JSON.stringify({ action:'Error', message:'Invalid JSON format' }));
                done();
                return;
            }

            // Only Game Proccess
            switch (parsed_Txt.action) 
            {
                case 'new_room':
                    socket.send(JSON.stringify({ action:'user_new', message:'Pleas Wait For - user_code' }));
                    done();
                    return;
                break; 

                case 'join_room':
                    socket.send(JSON.stringify({ action:'user_join', message:'Load Setting - environment area' }));
                    done();
                    return;
                break; 

                case 'message_room':
                    socket.send(JSON.stringify({ action:'user_message', message:'Message As Sent - to all members' }));
                    done();
                    return;
                break; 
                
                default:
                    // Handle unknown message action LeaveRoom
                    socket.send(JSON.stringify({ action:'user_error', message:'Invalid Action - method not found' }));
                    done();
                    return;
                
            }
        //----------------------------------------||  MESSAGE  ||----------------------------------------
        }); 

        // Handle client disconnect
        connection.socket.on('close', () => {
            console.log('----- old Client Disconnected - form server - InnoZee');
        });
    });

    done();
}