import sys
from twilio.rest import Client

account_sid = 'AC63a55e24ac3dc828c77ddd2b8f55d8cf'
auth_token = 'e2da770ea7b19753626202349e3e3c96'
client = Client(account_sid, auth_token)

# Check if command-line arguments are provided
if len(sys.argv) < 2:
    print("Usage: python3 test.py <message>")
    sys.exit(1)

# Get the message from command-line arguments
body = ' '.join(sys.argv[1:])

message = client.messages.create(
    from_='whatsapp:+14155238886',
    body=body,
    to='whatsapp:+26657980926'
)

print(message.sid)
