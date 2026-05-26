import { Resend } from "resend";

const resend = new Resend("YOUR_API_KEY");

const addresses = [
  "auth@findmeonline.com.ng",
  "support@findmeonline.com.ng",
  "info@findmeonline.com.ng",
  "noreply@findmeonline.com.ng",
];

const froms = [
  "Auth <auth@findmeonline.com.ng>",
  "Support <support@findmeonline.com.ng>",
  "Info <info@findmeonline.com.ng>",
  "No Reply <noreply@findmeonline.com.ng>",
];

for (let i = 0; i < addresses.length; i++) {
  const { data, error } = await resend.emails.send({
    from: froms[i],
    to: "support@findmeonline.com.ng",
    subject: `Test Email — ${addresses[i]}`,
    html: `
      <h2>Test Email</h2>
      <p>This is a test from: <strong>${addresses[i]}</strong></p>
    `,
  });

  if (error) {
    console.error(`❌ Failed [${addresses[i]}]:`, error.message);
  } else {
    console.log(`✅ Sent [${addresses[i]}] — ID: ${data.id}`);
  }
}
