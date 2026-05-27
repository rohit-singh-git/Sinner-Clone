import PolicyLayout from "@/components/policyLayout/PolicyLayout";

export default function TermsPage() {
    return (
        <PolicyLayout title="Terms of Service">
            <h2>Use of Website</h2>
            <p>
                By using this site, you agree to comply with all applicable
                laws.
            </p>

            <h2>Product Availability</h2>
            <p>Products may be discontinued without notice.</p>

            <h2>Pricing</h2>
            <p>Prices may change without prior notice.</p>

            <h2>Intellectual Property</h2>
            <p>All images, logos, and content belong to Official Sinner.</p>

            <h2>Liability</h2>
            <p>We are not liable for indirect damages.</p>
        </PolicyLayout>
    );
}
