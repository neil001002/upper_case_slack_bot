// require("dotenv").config();
// const { App } = require("@slack/bolt");
// const express = require("express");
// // const app = express()

// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
// });

// const CHANNEL1_NAME = "channel1";
// const CHANNEL2_NAME = "channel2";

// let channelId1, channelId2;

// app.command("/forward", async ({ command, ack, say, client }) => {
//   await ack();

//   // Ensure the message was sent from Channel 1
//   if (command.channel_name !== CHANNEL1_NAME) {
//     await say("This command can only be used in Channel 1.");
//     return;
//   }

//   // Extract the message text and remove the "/forward" command
//   const messageText = command.text.replace("/forward", "").trim().toUpperCase();

//   try {
//     // Send the uppercase message to Channel 2
//     await client.chat.postMessage({
//       channel: channelId2,
//       text: messageText,
//     });
//   } catch (error) {
//     console.error("Error posting message:", error);
//   }
// });

// (async () => {
//   await app.start();

//   // Fetch channel IDs for Channel 1 and Channel 2
//   const { channels } = await app.client.conversations.list({
//     token: process.env.SLACK_BOT_TOKEN,
//   });

//   channels.forEach((channel) => {
//     if (channel.name === CHANNEL1_NAME) {
//       channelId1 = channel.id;
//     } else if (channel.name === CHANNEL2_NAME) {
//       channelId2 = channel.id;
//     }
//   });

//   console.log("⚡️ Bolt app is running!", app);

//   await app.client.chat.postMessage({
//     token: process.env.SLACK_BOT_TOKEN,
//     channel: CHANNEL1_NAME,
//     text: "This is test!!",
//   });
// })();

// Importing the necessary modules
// const express = require("express"); // Express framework for building web applications
// const ngrok = require("ngrok"); // ngrok module to expose your local server to the internet
// const app = express(); // Create an instance of Express

// // Define a POST endpoint '/dice'
// app.post("/dice", (req, res) => {
//   const randomDice = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6
//   res.send(`Dice rolled: ${randomDice}`); // Send the response with the dice roll result
// });

// // Set the port for the server
// const PORT = process.env.PORT || 3200; // Use the PORT environment variable or default to 3200

// // Start the Express server
// app.listen(PORT, () => {
//   console.log(`Localhost running on: http://localhost:${PORT}`); // Log the local server URL

//   // Connect to ngrok to expose the server publicly
//   ngrok
//     .connect(PORT)
//     .then((ngrokUrl) => {
//       console.log(`Ngrok tunnel in: ${ngrokUrl}`); // Log the ngrok URL once the tunnel is established
//     })
//     .catch((error) => {
//       console.log(`Couldn't tunnel ngrok: ${error}`); // Log an error if ngrok fails to start
//     });
// });

// app.js
require("dotenv").config();
const { App } = require("@slack/bolt");
// Importing the necessary modules
const express = require("express"); // Express framework for building web applications
const ngrok = require("ngrok"); // ngrok module to expose your local server to the internet
const expressApp = express(); // Create an instance of Express

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/hello", async ({ command, ack, say }) => {
  await ack();

  await say(`Hello, <@${command.user_id}>`);
});

app.command("/forward", async ({ command, ack, say }) => {
  await ack();

  // Extract message text from the command and convert it to uppercase
  const messageText = command.text.toUpperCase();

  try {
    // Post the uppercase message to "Channel 2"
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: "C073P956ETF", // Replace with the actual channel ID
      text: messageText,
    });
  } catch (error) {
    console.error("Error posting message:", error);
  }
});

const CHANNEL1_NAME = "channel1";
const CHANNEL2_NAME = "channel2";

let channelId1, channelId2;

app.command("/forward", async ({ command, ack, say, client }) => {
  await ack();

  // Ensure the message was sent from Channel 1
  if (command.channel_name !== CHANNEL1_NAME) {
    await say("This command can only be used in Channel 1.");
    return;
  }

  // Extract the message text and remove the "/forward" command
  const messageText = command.text.replace("/forward", "").trim().toUpperCase();

  try {
    // Send the uppercase message to Channel 2
    await client.chat.postMessage({
      channel: channelId2,
      text: messageText,
    });
  } catch (error) {
    console.error("Error posting message:", error);
  }
});

// (async () => {
//   await app.start();

//   // Fetch channel IDs for Channel 1 and Channel 2
//   const { channels } = await app.client.conversations.list({
//     token: process.env.SLACK_BOT_TOKEN,
//   });

//   channels.forEach((channel) => {
//     if (channel.name === CHANNEL1_NAME) {
//       channelId1 = channel.id;
//     } else if (channel.name === CHANNEL2_NAME) {
//       channelId2 = channel.id;
//     }
//   })

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();

// Set the port for the server
const PORT = process.env.PORT || 3000; // Use the PORT environment variable or default to 3200

// Start the Express server
expressApp.listen(PORT, () => {
  console.log(`Localhost running on: http://localhost:${PORT}`); // Log the local server URL

  // Connect to ngrok to expose the server publicly
  ngrok
    .connect(PORT)
    .then((ngrokUrl) => {
      console.log(`Ngrok tunnel in: ${ngrokUrl}`); // Log the ngrok URL once the tunnel is established
    })
    .catch((error) => {
      console.log(`Couldn't tunnel ngrok: ${error}`); // Log an error if ngrok fails to start
    });
});
