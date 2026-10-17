
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";

const API_URL = process.env.EXPO_PUBLIC_API_URL!;

type PaymentMethod =
  | "stripe"
  | "paypal"
  | "bank_transfer";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type Props = {
  cart: CartItem[];
  onPaymentComplete: () => void;
};

export default function CheckoutScreen({
                                         cart,
                                         onPaymentComplete,
                                       }: Props) {
  const [method, setMethod] =
    useState<PaymentMethod>("stripe");
  const [loading, setLoading] = useState(false);

  const {
    initPaymentSheet,
    presentPaymentSheet,
  } = useStripe();

  const safeCart = Array.isArray(cart) ? cart : [];

  const total = safeCart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const startPayment = async () => {
    if (!cart.length) {
      Alert.alert("Cart", "Dein Warenkorb ist leer.");
      return;
    }

    setLoading(true);

    try {
      if (method === "stripe") {
        const response = await fetch(
          `${API_URL}/payments/stripe`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Add your authenticated user token here.
            },
            body: JSON.stringify({
              items: cart.map(({ id, quantity }) => ({
                id,
                quantity,
              })),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Payment konnte nicht erstellt werden.");
        }

        const { paymentIntentClientSecret } =
          await response.json();

        const { error: initError } =
          await initPaymentSheet({
            merchantDisplayName: "My Shop",
            paymentIntentClientSecret,
            returnURL: Linking.createURL("stripe-redirect"),
          });

        if (initError) {
          throw new Error(initError.message);
        }

        const { error } = await presentPaymentSheet();

        if (error) {
          if (error.code !== "Canceled") {
            Alert.alert("Zahlung", error.message);
          }
          return;
        }

        // Production: verify payment status on the server
        // before treating the order as paid.
        Alert.alert(
          "Zahlung eingereicht",
          "Deine Zahlung wird bestätigt."
        );
        return;
      }

      if (method === "paypal") {
        const response = await fetch(
          `${API_URL}/payments/paypal/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: cart.map(({ id, quantity }) => ({
                id,
                quantity,
              })),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("PayPal-Checkout konnte nicht gestartet werden.");
        }

        const { approvalUrl } = await response.json();

        // The backend must create this URL using PayPal's API.
        await Linking.openURL(approvalUrl);
        return;
      }

      if (method === "bank_transfer") {
        const response = await fetch(
          `${API_URL}/payments/bank-transfer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: cart.map(({ id, quantity }) => ({
                id,
                quantity,
              })),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Bestellung konnte nicht erstellt werden.");
        }

        const order = await response.json();

        Alert.alert(
          "Überweisung",
          `Bestellung: ${order.orderNumber}\n` +
          `IBAN: ${order.iban}\n` +
          `Betrag: ${order.amount}\n` +
          `Verwendungszweck: ${order.reference}`
        );
      }
    } catch (error) {
      Alert.alert(
        "Fehler",
        error instanceof Error
          ? error.message
          : "Die Zahlung ist fehlgeschlagen."
      );
    } finally {
      setLoading(false);
    }
  };

  const options: {
    id: PaymentMethod;
    label: string;
    description: string;
  }[] = [
    {
      id: "stripe",
      label: "Karte / Apple Pay / Google Pay",
      description: "Weitere verfügbare Zahlungsarten",
    },
    {
      id: "paypal",
      label: "PayPal",
      description: "Sicher über PayPal bezahlen",
    },
    {
      id: "bank_transfer",
      label: "Überweisung (SEPA)",
      description: "Per Banküberweisung bezahlen",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.total}>
        Gesamt: {total.toFixed(2)} €
      </Text>

      <Text style={styles.heading}>
        Zahlungsart wählen
      </Text>

      {options.map((option) => (
        <Pressable
          key={option.id}
          onPress={() => setMethod(option.id)}
          style={[
            styles.option,
            method === option.id && styles.selected,
          ]}
        >
          <Text style={styles.optionTitle}>
            {method === option.id ? "● " : "○ "}
            {option.label}
          </Text>
          <Text style={styles.description}>
            {option.description}
          </Text>
        </Pressable>
      ))}

      <Pressable
        disabled={loading}
        onPress={startPayment}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Jetzt bezahlen · {total.toFixed(2)} €
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 14,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  total: {
    fontSize: 22,
    fontWeight: "600",
  },
  heading: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 10,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    gap: 6,
  },
  selected: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    color: "#666",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
