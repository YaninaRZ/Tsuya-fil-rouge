import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.card}>{children}</View>
    </View>
  );
}

function Row({
  icon,
  label,
  onPress,
  danger,
  right,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  danger?: boolean;
  right?: React.ReactNode;
}) {
  return (
    <Pressable style={s.row} onPress={onPress} disabled={!onPress}>
      <View style={[s.rowIcon, danger && s.rowIconDanger]}>
        <Ionicons name={icon} size={18} color={danger ? "#ef4444" : "#3b82f6"} />
      </View>
      <Text style={[s.rowLabel, danger && s.rowLabelDanger]}>{label}</Text>
      {right ?? (onPress && <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />)}
    </Pressable>
  );
}

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <Pressable onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#0f172a" />
        </Pressable>
        <Text style={s.title}>Paramètres</Text>
        <View style={{ width: 40 }} />
      </View>

      <Section title="Compte">
        <Row icon="person-outline" label="Modifier le profil" onPress={() => {}} />
        <Row icon="download-outline" label="Exporter mes données (CSV)" onPress={() => {}} />
      </Section>

      <Section title="Préférences">
        <Row
          icon="moon-outline"
          label="Mode sombre"
          right={<Switch value={darkMode} onValueChange={setDarkMode} />}
        />
        <Row
          icon="notifications-outline"
          label="Notifications push"
          right={<Switch value={notifications} onValueChange={setNotifications} />}
        />
      </Section>

      <Section title="Légal">
        <Row icon="document-text-outline" label="Conditions d'utilisation" onPress={() => router.push("/cgu")} />
        <Row icon="shield-checkmark-outline" label="Politique de confidentialité" onPress={() => router.push("/privacy")} />
      </Section>

      <Section title="Zone de danger">
        <Row icon="log-out-outline" label="Se déconnecter" danger onPress={() => {}} />
        <Row icon="trash-outline" label="Supprimer mon compte" danger onPress={() => {}} />
      </Section>

      <Text style={s.version}>TsuyaApp v1.0.0</Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#f8fafc" },
  container: { paddingBottom: 40 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 64, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: "white" },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 17, fontWeight: "800", color: "#0f172a" },
  section: { paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle: { fontSize: 13, fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 },
  card: { backgroundColor: "white", borderRadius: 14, borderWidth: 1, borderColor: "#f1f5f9", overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
  rowIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#eff6ff", alignItems: "center", justifyContent: "center" },
  rowIconDanger: { backgroundColor: "#fef2f2" },
  rowLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: "#0f172a" },
  rowLabelDanger: { color: "#ef4444" },
  version: { fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 24 },
});
