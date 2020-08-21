# dialogflow-editor-server

## Overview
A template server for managing intents on Dialogflow using the [Dialogflow Editor](https://github.com/thinkty/dialogflow-editor) and also serving as a chatbot for various chat application platforms such as [Slack](https://api.slack.com/bot-users), [Discord](https://discordpy.readthedocs.io/en/latest/discord.html), or [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform/).

## System Layout
The system layout can be divided into two functional parts:

### Editor
The editor segment handles the interaction between the Dialogflow Editor and the server. When a user exports the graph from the Dialogflow Editor to an instance of this server, intents will be parsed from the graph data and be sent to Dialogflow. After Dialogflow is successfully updated, the server will update its own state transition table.
![system layout for editor](https://imgur.com/YYkyeWJ.png)
1. The end user will edit the graph using the Dialogflow Editor tool
2. Once done, the user will send the graph to an instance of this server including the graph and the agent name
3. Once the server receives the graph, it will **validate** the graph, **parse** intents from the graph, and finally, **update** Dialogflow with the new intents
4. The update process will be executed using the [IntentsClient](https://googleapis.dev/nodejs/dialogflow/latest/v2.IntentsClient.html#batchUpdateIntents) APIs from Dialogflow
5. Dialogflow will verify the intents for the last time and update
6. If any error is detected during the process, Dialogflow will send the reason
7. If the process was successful, a 200 OK will be sent back to the client

### Chatbot
The chatbot segment handles the interaction between the message platform such as Slack, Discord, or Facebook Messenger and the server.
![system layout for chatbot](https://imgur.com/Q5CzUr1.png)
1. The end user is the person communicating with the chatbot
2. The end user sends a message on the platform (Slack, Discord, or Facebook Messenger)
3. The platform then adds additional payloads such as user identifier, the message, and more depending on the platform
4. The platform calls the registered server with the additional payloads
5. The server then receives the payload and parses the necessary information to retrieve the user's latest status
6. The server sends a request to Dialogflow to detect which intent the user's message falls into based on the status
7. Based on the current context of the user and the input (message), Dialogflow computes the appropriate intent
8. Dialogflow responds with an intent that may contain an action which will help the server make decisions
9. After deciding the next status of the user, the server sends a message (a reply to the user) to the platform
10. After validation, the platform passes on the message to the user

The process above is an extremely abstract version of the single session between a user and the chatbot.
The layout above does not include the interaction between the [Dialogflow Editor](https://github.com/thinkty/dialogflow-editor) and the server as that is a different process.
In conclusion, this project is aimed to provide a modular server that can handle multiple platforms at once.

## Installation
TBA

## Plans
TBA

## License
MIT
