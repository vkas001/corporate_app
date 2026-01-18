import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { PERMISSION_OPTIONS } from "@/config/permissionConfig";
import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";

export type CreateProducerInput = {
	name: string;
	email: string;
	password: string;
	phone?: string;
	address?: string;
	permissions?: string[];
};

type Props = {
	isSubmitting?: boolean;
	onSubmit: (data: CreateProducerInput) => void | Promise<void>;
};

export default function ProducerForm({ isSubmitting = false, onSubmit }: Props) {
	const { colors } = useTheme();

	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		password: "",
		confirmPassword: "",
	});
	const [permissions, setPermissions] = useState<string[]>([]);
	const [permissionsExpanded, setPermissionsExpanded] = useState(false);

	const [errors, setErrors] = useState<Record<string, string | undefined>>({});

	const emailTrimmed = useMemo(() => form.email.trim(), [form.email]);

	const validate = () => {
		const nextErrors: Record<string, string | undefined> = {};

		if (!form.name.trim()) nextErrors.name = "Name is required";

		if (!emailTrimmed) {
			nextErrors.email = "Email is required";
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(emailTrimmed)) nextErrors.email = "Enter a valid email";
		}

		if (!form.password.trim()) {
			nextErrors.password = "Password is required";
		} else if (form.password.trim().length < 6) {
			nextErrors.password = "Password must be at least 6 characters";
		}

		if (!form.confirmPassword.trim()) {
			nextErrors.confirmPassword = "Confirm your password";
		} else if (form.password !== form.confirmPassword) {
			nextErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(nextErrors);
		return Object.values(nextErrors).every((v) => !v);
	};

	const submit = async () => {
		if (!validate()) return;
		await onSubmit({
			name: form.name.trim(),
			email: emailTrimmed,
			password: form.password,
			phone: form.phone.trim() || undefined,
			address: form.address.trim() || undefined,
			permissions: permissions.length ? permissions : undefined,
		});
	};

	const togglePermission = (key: string) => {
		setPermissions((prev) => (prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]));
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
		>
			<View
				className="rounded-3xl p-5 mb-10 border"
				style={{ backgroundColor: colors.surface, borderColor: colors.border }}
			>
				<Text className="text-lg font-bold" style={{ color: colors.textPrimary }}>
					Producer Details
				</Text>
				<Text className="text-xs mt-1" style={{ color: colors.textSecondary }}>
					Create a new producer account. The role will be Producer.
				</Text>

			<CustomInput
				label="Name"
				placeholder="Full name"
				value={form.name}
				onChangeText={(text) => {
					setForm((p) => ({ ...p, name: text }));
					if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
				}}
				icon="person-outline"
				error={errors.name}
				editable={!isSubmitting}
			/>

			<CustomInput
				label="Email"
				placeholder="producer@company.com"
				value={form.email}
				onChangeText={(text) => {
					setForm((p) => ({ ...p, email: text }));
					if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
				}}
				keyboardType="email-address"
				autoCapitalize="none"
				icon="mail-outline"
				error={errors.email}
				editable={!isSubmitting}
			/>

			<CustomInput
				label="Phone (optional)"
				placeholder="98XXXXXXXX"
				value={form.phone}
				onChangeText={(text) => setForm((p) => ({ ...p, phone: text }))}
				keyboardType="phone-pad"
				icon="call-outline"
				editable={!isSubmitting}
			/>

			<CustomInput
				label="Address (optional)"
				placeholder="City, Street"
				value={form.address}
				onChangeText={(text) => setForm((p) => ({ ...p, address: text }))}
				icon="location-outline"
				editable={!isSubmitting}
			/>

			<CustomInput
				label="Password"
				placeholder="Create a password"
				value={form.password}
				onChangeText={(text) => {
					setForm((p) => ({ ...p, password: text }));
					if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
				}}
				secureTextEntry
				icon="lock-closed-outline"
				error={errors.password}
				editable={!isSubmitting}
			/>

			<CustomInput
				label="Confirm Password"
				placeholder="Re-enter password"
				value={form.confirmPassword}
				onChangeText={(text) => {
					setForm((p) => ({ ...p, confirmPassword: text }));
					if (errors.confirmPassword)
						setErrors((p) => ({ ...p, confirmPassword: undefined }));
				}}
				secureTextEntry
				icon="shield-checkmark-outline"
				error={errors.confirmPassword}
				editable={!isSubmitting}
			/>

			<View className="mt-5">
				<Pressable
					onPress={() => setPermissionsExpanded((v) => !v)}
					className="flex-row items-center justify-between"
					disabled={isSubmitting}
				>
					<View>
						<Text className="text-sm font-bold" style={{ color: colors.textPrimary }}>
							Permissions (optional)
						</Text>
						<Text className="text-xs mt-1" style={{ color: colors.textSecondary }}>
							{permissions.length ? `${permissions.length} selected` : "None selected"}
						</Text>
					</View>
					<Ionicons
						name={permissionsExpanded ? "chevron-up" : "chevron-down"}
						size={18}
						color={colors.textSecondary}
					/>
				</Pressable>

				{permissionsExpanded ? (
					<>
						<Text className="text-xs mt-2" style={{ color: colors.textSecondary }}>
							Select extra permissions for this user.
						</Text>
						<View className="mt-3 gap-2">
							{PERMISSION_OPTIONS.map((opt) => {
								const selected = permissions.includes(opt.key);
								return (
									<Pressable
										key={opt.key}
										onPress={() => togglePermission(opt.key)}
										disabled={isSubmitting}
										className="rounded-2xl border px-4 py-3"
										style={{
											borderColor: selected ? colors.primary : colors.border,
											backgroundColor: selected ? `${colors.primary}15` : colors.background,
										}}
									>
										<View className="flex-row items-center justify-between">
											<View style={{ flex: 1, paddingRight: 12 }}>
												<Text
													className="text-sm font-semibold"
													style={{ color: colors.textPrimary }}
												>
													{opt.label}
												</Text>
												<Text className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
													{opt.description}
												</Text>
											</View>
											<Ionicons
												name={selected ? "checkbox" : "square-outline"}
												size={18}
												color={selected ? colors.primary : colors.textSecondary}
											/>
										</View>
									</Pressable>
								);
							})}
						</View>
					</>
				) : null}
			</View>

			<View className="mt-6">
				<CustomButton
					title={isSubmitting ? "Creating..." : "Create Producer"}
					onPress={submit}
					isLoading={isSubmitting}
				/>
			</View>
			</View>
		</KeyboardAvoidingView>
	);
}

