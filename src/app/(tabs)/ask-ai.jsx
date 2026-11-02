import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { askQuestion } from '@/services/askService';
import { getPlaceById } from '@/services/placesService';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

const SUGGESTIONS = ['Where is the library?', 'Where is the gym?', 'Where is the Career Center?'];

function PlaceLinks({ placeIds }) {
  const places = placeIds.map((id) => getPlaceById(id)).filter(Boolean);
  if (places.length === 0) {
    return null;
  }

  return (
    <View style={styles.links}>
      {places.map((place) => {
        const hasLocation = place.latitude !== null && place.longitude !== null;
        return (
          <View key={place.id} style={styles.linkRow}>
            <Pressable
              onPress={() => router.push(`/place/${place.id}`)}
              accessibilityRole="button"
              accessibilityLabel={`Open details for ${place.name}`}
              style={styles.linkMain}>
              <Text style={styles.linkName}>{place.name}</Text>
              <Text style={styles.linkSub}>View details</Text>
            </Pressable>
            {hasLocation && (
              <Pressable
                onPress={() =>
                  router.push({ pathname: '/map', params: { placeId: place.id, t: String(Date.now()) } })
                }
                accessibilityRole="button"
                accessibilityLabel={`Show ${place.name} on the map`}
                style={styles.linkMap}>
                <Ionicons name="map" size={18} color={Colors.onPrimary} />
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
}

export default function AskAiScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);
  const nextId = useRef(1);

  function addMessage(message) {
    const id = String(nextId.current);
    nextId.current += 1;
    setMessages((previous) => [...previous, { id, ...message }]);
  }

  async function send(text) {
    const question = text.trim();
    if (question === '' || sending) {
      return;
    }

    addMessage({ role: 'user', text: question, placeIds: [] });
    setInput('');
    setSending(true);

    const result = await askQuestion(question);
    if (result.status === 'ok') {
      addMessage({ role: 'assistant', text: result.answer, placeIds: result.placeIds });
    } else {
      addMessage({ role: 'assistant', text: result.message, placeIds: [], isError: true });
    }
    setSending(false);
  }

  function renderMessage({ item }) {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.bubbleRow, isUser && styles.bubbleRowUser]}>
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}>
          <Text
            style={[
              styles.bubbleText,
              isUser && styles.bubbleTextUser,
              item.isError && styles.bubbleTextError,
            ]}>
            {item.text}
          </Text>
          {!isUser && <PlaceLinks placeIds={item.placeIds} />}
        </View>
      </View>
    );
  }

  const canSend = input.trim() !== '' && !sending;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          This assistant searches unverified campus information. AI is not connected yet, so it can only
          answer from the Places data.
        </Text>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        onContentSizeChange={() => listRef.current && listRef.current.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Ask about campus places</Text>
            <Text style={styles.emptyNote}>Try one of these:</Text>
            {SUGGESTIONS.map((suggestion) => (
              <Pressable
                key={suggestion}
                onPress={() => send(suggestion)}
                accessibilityRole="button"
                style={styles.suggestion}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </Pressable>
            ))}
          </View>
        }
      />

      {sending && (
        <View style={styles.typing}>
          <ActivityIndicator color={Colors.primary} />
          <Text style={styles.typingText}>Searching...</Text>
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask where something is"
          placeholderTextColor={Colors.textSecondary}
          maxLength={200}
          returnKeyType="send"
          onSubmitEditing={() => send(input)}
          accessibilityLabel="Type your question"
        />
        <Pressable
          onPress={() => send(input)}
          disabled={!canSend}
          accessibilityRole="button"
          accessibilityLabel="Send question"
          style={[styles.sendButton, !canSend && styles.sendDisabled]}>
          <Ionicons name="send" size={20} color={Colors.onPrimary} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  notice: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    padding: Spacing.sm,
  },
  noticeText: { ...Typography.caption, color: Colors.textSecondary },
  list: { padding: Spacing.md, flexGrow: 1 },
  bubbleRow: { flexDirection: 'row', marginBottom: Spacing.sm },
  bubbleRowUser: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '88%', borderRadius: Radius.lg, padding: Spacing.md, gap: Spacing.sm },
  bubbleUser: { backgroundColor: Colors.primary },
  bubbleAssistant: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  bubbleText: { ...Typography.body, color: Colors.text },
  bubbleTextUser: { color: Colors.onPrimary },
  bubbleTextError: { color: Colors.danger },
  links: { gap: Spacing.sm },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  linkMain: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
  },
  linkName: { ...Typography.caption, color: Colors.text, fontWeight: '600' },
  linkSub: { ...Typography.caption, color: Colors.primary },
  linkMap: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { alignItems: 'center', padding: Spacing.lg, gap: Spacing.sm },
  emptyTitle: { ...Typography.heading, color: Colors.text },
  emptyNote: { ...Typography.body, color: Colors.textSecondary },
  suggestion: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  suggestionText: { ...Typography.body, color: Colors.primary },
  typing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingHorizontal: Spacing.md },
  typingText: { ...Typography.caption, color: Colors.textSecondary },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    ...Typography.body,
    color: Colors.text,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: { opacity: 0.4 },
});