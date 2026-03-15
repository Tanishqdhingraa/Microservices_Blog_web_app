import amqp from 'amqplib';
import dotenv from "dotenv";
import nodemailer from 'nodemailer'

dotenv.config();

const exchange = 'User_indentification';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.GMAIL_USER,   // ✅ CHANGED (added env variable)
        pass:process.env.GMAIL_PASSWORD // ✅ CHANGED (better env name)
    }
})

async function Sendwelcomemail(email , name) {
    await transporter.sendMail({
        from: "DevBlog",
        to: email,
        subject:"Welcome to DevBlog 💻",
        html:`
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h2 style="color:#2563eb;">Hello ${name} 👋</h2>  <!-- ✅ CHANGED (dynamic name) -->

  <p>
    Welcome to <strong>DevBlog</strong> 💻
  </p>

  <p>
    We're excited to have you back! You’ve successfully logged in to your developer account.
  </p>

  <div style="background:#f1f5f9; padding:12px; border-radius:8px; margin:16px 0;">
    <p style="margin:0;">
      🚀 Explore technical blogs, share your knowledge, learn from other developers, and stay updated with the latest trends in software development.
    </p>
  </div>

  <p>
    Start reading, writing, and engaging with the developer community.
  </p>

  <p>
    If this login wasn’t you, please secure your account immediately.
  </p>

  <p style="margin-top:20px;">
    Happy Coding,<br/>
    <strong>Team DevBlog</strong> 💙
  </p>
</div>
        `
    });

    console.log(`Email sent to ${email}`);
}

export async function StartConsumer() {
    
    const connection = await amqp.connect("amqp://admin:admin123@localhost:5672");
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange,'topic',{durable:true});

    const q = await channel.assertQueue('Notification_queue', { durable:true }); // ✅ CHANGED (durable queue)

    await channel.bindQueue(q.queue,exchange,"user_login"); // ✅ CHANGED (bindQueue instead of bindExchange)

    console.log("📩 Notification Service listening..."); // ✅ MOVED outside

    channel.consume(q.queue, async(msg)=>{

        const data = JSON.parse(msg.content.toString());

        if (data.event === "USER_LOGGED_IN") {
            await Sendwelcomemail(data.email, data.name);
        }

        channel.ack(msg);

    })
}