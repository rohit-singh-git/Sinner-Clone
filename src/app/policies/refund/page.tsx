import PolicyLayout from "@/components/policyLayout/PolicyLayout";

export default function RefundPolicy() {
    return (
        <PolicyLayout title="Refund Policy">
            <h2>Returns</h2>
            <p>
                Returns are accepted within 7 days of delivery for unused items
                with tags.
            </p>

            <h2>Non-returnable Items</h2>
            <p>
                Sale items, gift cards, and customized products are
                non-refundable.
            </p>

            <h2>Refund Processing</h2>
            <p>Approved refunds are processed within 5–10 business days.</p>

            <h2>Damaged Products</h2>
            <p>Please contact us within 48 hours with photos.</p>
        </PolicyLayout>
    );
}
