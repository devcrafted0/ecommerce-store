import React from 'react'

const page = () => {
  return (
    <div>
         <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 md:p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 border-b-4 border-primary pb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last Updated: October 12, 2025
        </p>

        <section className="space-y-6 text-gray-700">
          <p>
            Your privacy is critically important to us. This Privacy Policy outlines what information [Your Marketplace Name] ("we," "us," or "our") collects, how we use it, and the steps we take to protect it. This policy applies to all users (Buyers, Sellers, and Visitors) of our Service.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">1. Information We Collect</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1.1. Information You Provide Directly</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Profile Data:</strong> Name, email address, password, avatar, and optional bio.
            </li>
            <li>
              <strong>Transactional Data:</strong> Payment information (handled securely via Stripe or mock integration), shipping address, and phone number necessary for order fulfillment.
            </li>
            <li>
              <strong>Seller Data:</strong> For Sellers, this includes business name, and payment information for receiving payouts.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1.2. Information Collected Through Your Use of the Service</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Activity Data:</strong> Product searches, pages viewed, products liked, products saved to wishlist, and sellers followed.
            </li>
            <li>
              <strong>Social Interaction Data:</strong> Product reviews, ratings, and any messages exchanged via optional chat features.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, operating system, and JWT-based session data for authentication.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">2. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Service Provision:</strong> To create and manage your account, process orders, facilitate payments, and manage order statuses.
            </li>
            <li>
              <strong>Social Engagement:</strong> To display your activity (e.g., "User X reviewed Product Y") in the Social Feed of your followers.
            </li>
            <li>
              <strong>Personalization:</strong> To provide tailored product recommendations, notifications (e.g., "New follower," "Order shipped"), and personalized content.
            </li>
            <li>
              <strong>Security:</strong> To detect, prevent, and respond to potential fraud, abuse, and security issues.
            </li>
            <li>
              <strong>Analytics and Improvement:</strong> To monitor platform usage, analyze sales trends (Seller analytics), and improve site features.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">3. How Your Information is Shared</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>With Other Users (Transactional):</strong> When a Buyer places an order, their shipping address and name are shared with the Seller for fulfillment. When a Seller receives an order, their product details are visible to the Buyer.
            </li>
            <li>
              <strong>With Other Users (Social):</strong> Your profile avatar, username, reviews, and following/follower counts are public on the platform. When you follow a Seller, that Seller is notified.
            </li>
            <li>
              <strong>Service Providers:</strong> We share necessary data with third-party vendors for functions like payment processing (e.g., Stripe) and email notifications. These providers are bound by confidentiality agreements.
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">4. Data Security and Retention</h2>
          <p>
            We use industry-standard security measures (e.g., HTTPS, JWT-based authentication) to protect your data. However, no method of transmission over the Internet is 100% secure.
          </p>
          <p>
            We retain your personal data for as long as your account is active or as needed to provide you with the Service. Transactional records may be kept for a longer period as required by law.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">5. Your Privacy Rights</h2>
          <p>
            You have the right to access, update, or delete the personal information associated with your account. You can typically do this through your profile settings. For requests that cannot be handled through the profile interface, please contact us directly.
          </p>
          <p>
            You may opt-out of optional email notifications at any time.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>
        </section>
      </div>
    </div>
    </div>
  )
}

export default page