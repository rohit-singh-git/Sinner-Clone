import PolicyLayout from "@/components/policyLayout/PolicyLayout";

export default function ShippingPolicy() {
    return (
        <PolicyLayout title="Shipping Policy">
            <h2>Order Processing</h2>
            <p>
                Orders are processed within 1–3 business days after payment
                confirmation.
            </p>

            <h2>Delivery Timeline</h2>
            <p>
                Domestic orders: 3–7 business days.
                <br />
                International orders: 7–21 business days.
            </p>

            <h2>Shipping Charges</h2>
            <p>Shipping charges are calculated at checkout.</p>

            <h2>Tracking</h2>
            <p>Tracking details are sent via email once your order ships.</p>

            <h2>Delays</h2>
            <p>
                Delivery delays due to weather, customs, or courier issues are
                outside our control.
            </p>
        </PolicyLayout>
    );
}
