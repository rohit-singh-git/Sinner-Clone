import PolicyLayout from "@/components/policyLayout/PolicyLayout";

export default function GiftCardPolicy() {
    return (
        <PolicyLayout title="Gift Card & Store Credit Policy">
            <h2>Gift Cards</h2>
            <p>
                Gift cards are non-refundable and cannot be exchanged for cash.
            </p>

            <h2>Validity</h2>
            <p>Gift cards remain valid for 12 months from purchase.</p>

            <h2>Store Credit</h2>
            <p>
                Store credits are issued for approved returns where applicable.
            </p>

            <h2>Lost Codes</h2>
            <p>Lost or stolen gift cards cannot be replaced.</p>
        </PolicyLayout>
    );
}
