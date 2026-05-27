import PolicyLayout from "@/components/policyLayout/PolicyLayout";

export default function PrivacyPolicy() {
    return (
        <PolicyLayout title="Privacy Policy">
            <h2>Information We Collect</h2>
            <p>Name, email, address, phone number, and payment information.</p>

            <h2>How We Use Data</h2>
            <p>
                To process orders, improve services, and communicate with
                customers.
            </p>

            <h2>Cookies</h2>
            <p>We use cookies for analytics and better shopping experience.</p>

            <h2>Third Parties</h2>
            <p>
                Payment gateways and logistics partners may access limited
                information.
            </p>

            <h2>Your Rights</h2>
            <p>You may request data deletion anytime.</p>
        </PolicyLayout>
    );
}
