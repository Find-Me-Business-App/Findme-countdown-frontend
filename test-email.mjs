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

const otp = "482913";
const senderLabel = addresses[0];

const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
  <title>Verify your email – FindMe</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
    body { margin: 0 !important; padding: 0 !important; background-color: #f4f6fb; width: 100% !important; }
    .email-card { background-color: #ffffff; border-radius: 24px; overflow: hidden; }
    @media only screen and (max-width: 480px) {
      .outer-td { padding: 16px 8px !important; }
      .card-table { width: 100% !important; border-radius: 16px !important; }
      .header-td { padding: 28px 24px 0 !important; }
      .body-td { padding: 28px 24px 0 !important; }
      .footer-td { padding: 0 24px !important; }
      .bottom-td { padding: 24px 24px 20px !important; }
      .greeting { font-size: 17px !important; }
      .otp { font-size: 26px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f6fb;">

  <!-- Outer wrapper -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
    <tr>
      <td class="outer-td" align="center" style="padding:32px 16px;">

        <!-- Email card -->
        <table class="card-table" border="0" cellpadding="0" cellspacing="0" width="390" role="presentation"
          style="background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">

          <!-- HEADER: Logo -->
          <tr>
            <td class="header-td" style="padding:36px 32px 0;">
              <img
                src="https://res.cloudinary.com/daxhwyhbt/image/upload/v1779810569/Find_Me_Logo_findme_wordmark_22_msfanz.png"
                alt="FindMe" width="165" height="21"
                style="display:block;max-width:100%;height:auto;" />
            </td>
          </tr>

          <!-- Floral divider -->
          <tr>
            <td style="padding-top:24px;line-height:0;">
              <img
                src="https://res.cloudinary.com/daxhwyhbt/image/upload/v1779810696/Group_11002_rfmyjm.png"
                alt="" width="390" height="56"
                style="display:block;width:100%;max-width:100%;height:auto;" />
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td class="body-td" style="padding:32px 32px 0;">

              <!-- Greeting -->
              <p class="greeting" style="margin:0 0 20px;font-family:'Mulish',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:19px;font-weight:700;color:#1d2c60;line-height:1.4;">
                Welcome to FindMe App — Verify<br />your email
              </p>

              <!-- Instruction -->
              <p style="margin:0 0 20px;font-family:'Mulish',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;font-weight:500;color:#2e3e66;line-height:1.6;">
                Confirm your email to start finding out what matters:
              </p>

              <!-- OTP -->
              <p class="otp" style="margin:0 0 24px;font-family:'Mulish',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:28px;font-weight:700;color:#1d2c60;letter-spacing:2px;line-height:1;">
                ${otp}
              </p>

              <!-- Expiry note -->
              <p style="margin:0 0 16px;font-family:'Mulish',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;font-weight:500;color:#2e3e66;line-height:1.6;">
                This code expires in 30 minutes and can only be used once.
              </p>

              <!-- Privacy note -->
              <p style="margin:0 0 24px;font-family:'Mulish',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;font-weight:500;color:#2e3e66;line-height:1.6;">
                We will never ask you to share this code with anyone.
              </p>

              <!-- Sign off -->
              <p style="margin:0 0 32px;font-family:'Mulish',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:17px;font-weight:700;color:#1d2c60;">
                Team FindMe
              </p>

            </td>
          </tr>

          <!-- FOOTER: tagline + social -->
          <tr>
            <td class="footer-td" style="padding:0 32px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"
                style="border-bottom:1.5px solid #e8edf5;padding-bottom:14px;">
                <tr>
                  <td style="font-family:'Mulish',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:11px;font-weight:400;color:#8e9cb2;text-transform:uppercase;letter-spacing:0.5px;">
                    Limitless Possibilities
                  </td>
                  <td align="right">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="padding-left:8px;">
                          <a href="#" target="_blank" style="text-decoration:none;">
                            <img src="https://res.cloudinary.com/daxhwyhbt/image/upload/v1779372199/Group_3123_uljhu6.svg" alt="Facebook" width="28" height="28" style="display:block;" />
                          </a>
                        </td>
                        <td style="padding-left:8px;">
                          <a href="#" target="_blank" style="text-decoration:none;">
                            <img src="https://res.cloudinary.com/daxhwyhbt/image/upload/v1779372198/Group_3122_acq64v.svg" alt="Instagram" width="28" height="28" style="display:block;" />
                          </a>
                        </td>
                        <td style="padding-left:8px;">
                          <a href="#" target="_blank" style="text-decoration:none;">
                            <img src="https://res.cloudinary.com/daxhwyhbt/image/upload/v1779372197/Group_3121_hor6tx.svg" alt="LinkedIn" width="28" height="28" style="display:block;" />
                          </a>
                        </td>
                        <td style="padding-left:8px;">
                          <a href="#" target="_blank" style="text-decoration:none;">
                            <img src="https://res.cloudinary.com/daxhwyhbt/image/upload/v1779372197/Group_3120_ggoyyq.svg" alt="Twitter" width="28" height="28" style="display:block;" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom brand info -->
          <tr>
            <td class="bottom-td" align="center" style="padding:28px 32px 20px;">
              <img
                src="https://res.cloudinary.com/daxhwyhbt/image/upload/v1779810467/Find_Me_Logo_findme_logo_icon_24_k6vtfu.png"
                alt="FindMe" width="48" height="48"
                style="display:block;margin:0 auto 12px;" />
              <p style="margin:0 0 6px;font-family:'Mulish',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:13px;font-weight:600;color:#1d2c60;">
                © 2026 FindMe App
              </p>
              <p style="margin:0;font-family:'Mulish',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;font-weight:500;color:#2e3e66;opacity:0.85;">
                Brass Junction, Aba 1810001
              </p>
            </td>
          </tr>

          <!-- Bottom wave pattern -->
          <tr>
            <td style="line-height:0;padding:0;">
              <img
                src="https://res.cloudinary.com/daxhwyhbt/image/upload/v1779372116/bottom_syayou.svg"
                alt="" width="390"
                style="display:block;width:100%;max-width:100%;height:auto;" />
            </td>
          </tr>

        </table>
        <!-- /Email card -->

      </td>
    </tr>
  </table>

</body>
</html>`;

