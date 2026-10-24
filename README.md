Why is it dangerous to store passwords in plain text, and how does hashing prevent harm if the database is compromised?

Danger of Plain Text Passwords vs. HashingThe Danger: Storing passwords in plain text means anyone with read access to the database—whether through an injection vulnerability, 
an exposed database backup, or compromised credentials—immediately sees every user's actual password. 
Because users frequently reuse passwords across multiple websites, a single breach compromises their accounts across other internet services.
How Hashing Protects Users: Hashing uses a one-way mathematical function (like bcrypt) that transforms a password into a scrambled string. Because hashing cannot be reversed, 
an attacker who steals the database only sees hash values. Algorithms like bcrypt also add a unique "salt" (random data) to each password before hashing, which prevents attackers 
from using precomputed lookup tables ("rainbow tables") to guess passwords.   


The login endpoint returns the same error for "user not found" and "wrong password." Why is this better than giving specific messages?

Generic "Invalid Credentials" Response
Prevents User Enumeration: If the endpoint returned "User not found", an attacker could submit lists of emails to detect which ones exist in your system. If it returned "Wrong password", 
the attacker would know the email is registered and could focus brute-force attacks on that specific user.

Unified Security: Returning a generic message like { "error": "Invalid credentials" } hides whether the email or the password was incorrect, preventing attackers from probing valid user accounts.

In your own words, what does the middleware do on every protected request, and why is it better than putting token-checking code inside every route handler?

 Middleware Role vs. Route-Level CheckingWhat Middleware Does: The authentication middleware acts as a gatekeeper between the incoming HTTP request and your route handler. 
 It checks the Authorization header for a Bearer token, verifies the token's cryptographic signature against your secret key, decodes the user payload, and attaches it to req.user. 
 If the token is missing or invalid, it halts the request immediately with a 401 Unauthorized response.   Why It Is Better: Centralizing this in middleware keeps your code DRY (Don't Repeat Yourself). 
 Instead of repeating 15+ lines of token-checking logic inside every protected route, you apply the middleware function once. 
 This ensures consistent security, prevents human error when adding new endpoints, and makes maintenance easier.

What is one thing that could still go wrong in this system (e.g., token theft, no HTTPS, weak secrets), and how would you address it in a real application?

Potential Risks & Real-World FixesHere are common security risks in basic JWT setups and how to address them in production:Token Theft via XSS (Cross-Site Scripting): 
If front-end applications store JWTs in localStorage, malicious scripts on the page can access and steal them.Fix: Store JWTs inside httpOnly SameSite cookies so client-side 
JavaScript cannot read or access the token.Unencrypted Traffic (No HTTPS): Transmitting tokens over plain HTTP allows attackers on the same network (e.g., public Wi-Fi) to intercept the Authorization header.  
Fix: Enforce HTTPS/TLS across all environment endpoints so network traffic is encrypted end-to-end.Inability to Revoke Stolen Tokens: Because JWT verification is stateless, 
a stolen token remains valid until it natural expires.
Fix: Use short-lived Access Tokens (e.g., 15 minutes) paired with Refresh Tokens stored securely in HTTP-only cookies that can be revoked in the database if an account is compromised.
