<div align="center">

<img src="assets/logoBlue.png" alt="Tappsy Logo" width="128" />

# Tappsy

**Cross-platform real-time mobile messaging client engineered with React Native, Expo SDK 54, TypeScript, and Java EE WebSockets.**
Built with a responsive tabbed UX architecture, persistent Light/Dark/System theming, and zero third-party BaaS lock-in.

<p>
  <img src="https://img.shields.io/badge/React_Native-0.81.4-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-SDK_54-000020?style=flat-square&logo=expo&logoColor=white" alt="Expo SDK 54" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NativeWind-v4.2-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" alt="NativeWind" />
  <img src="https://img.shields.io/badge/Backend-Jakarta_EE_WebSockets-007396?style=flat-square&logo=openjdk&logoColor=white" alt="Jakarta EE WebSockets" />
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-22C55E?style=flat-square" alt="MIT License" />
  </a>
</p>

</div>

---

## System Architecture

Tappsy separates presentation, navigation, theme persistence, REST account management, and persistent bidirectional WebSocket streams into clean, modular React Context providers and custom hooks.

```mermaid
flowchart TB
    subgraph Client["Tappsy Mobile Client - React Native and Expo SDK 54"]
        UI["Navigation Stack and Bottom Tabs<br/>Chats, Updates, Calls, Settings, Profile"]
        Auth["AuthProvider<br/>AsyncStorage Session Persistence"]
        Theme["ThemeProvider<br/>Light, Dark, and System Sync"]
        Reg["UserRegistrationProvider<br/>Multi-Step Onboarding State"]
        Hooks["Custom Socket Hooks<br/>useChatList, useSingleChat, useSendChat, useWebSocketPing"]
        RestSvc["UserService REST Client<br/>Multipart Uploads and PIN Login"]
        WsProv["WebSocketProvider<br/>Persistent WSS Connection Manager"]
    end

    subgraph Backend["Tappsy Java / Jakarta EE Backend"]
        WsEnd["WebSocket ServerEndpoint<br/>Full-Duplex Chat Broker"]
        RestApi["HTTP REST Servlets<br/>UserController, LoginController, ProfileController"]
        DB["Relational Database<br/>Users, Contacts, Messages, Presence"]
    end

    UI -->|Read Auth State| Auth
    UI -->|Apply Theme Tokens| Theme
    UI -->|Collect Registration Form| Reg
    UI -->|Subscribe to Live Streams| Hooks
    UI -->|Submit Auth and Avatar| RestSvc
    Hooks -->|Dispatch JSON Frames| WsProv
    WsProv -->|Secure WSS Stream| WsEnd
    RestSvc -->|HTTPS Multipart and Form| RestApi
    WsEnd -->|Persist and Broadcast| DB
    RestApi -->|Query and Store| DB
```

### Real-Time Messaging & Heartbeat Lifecycle

```mermaid
sequenceDiagram
    participant App as Mobile Client
    participant WS as WebSocketProvider
    participant Server as Jakarta EE ServerEndpoint
    participant DB as Relational Database

    App->>WS: Initialize connection with userId
    WS->>Server: Upgrade to WSS chat endpoint
    Server-->>WS: Connection established
    App->>WS: Request chat list
    WS->>Server: JSON type get_chat_list
    Server->>DB: Load recent conversations
    DB-->>Server: Conversation records
    Server-->>WS: JSON type friend_list
    WS-->>App: Hydrate Chats screen
    loop Every 6 seconds
        App->>WS: Heartbeat timer tick
        WS->>Server: JSON type PING
        Server-->>WS: JSON type PONG
    end
    App->>WS: Submit outbound message
    WS->>Server: JSON type send_message
    Server->>DB: Persist message payload
    Server-->>WS: JSON type new_message broadcast
    WS-->>App: Append message to conversation
```

---

## Cross-Platform Interface Showcase

### iOS Captures

<table align="center">
  <tr>
    <td align="center"><b>Chats (Light)</b></td>
    <td align="center"><b>Chats (Dark)</b></td>
    <td align="center"><b>Updates &amp; Status</b></td>
    <td align="center"><b>Calls History</b></td>
  </tr>
  <tr>
    <td><img src="screenshots/ios/ios_05_HomeScreen_Chats.png" width="190" alt="iOS Chats Light" /></td>
    <td><img src="screenshots/ios/ios_11_HomeScreen_Dark.png" width="190" alt="iOS Chats Dark" /></td>
    <td><img src="screenshots/ios/ios_13_Status_Screen.png" width="190" alt="iOS Updates Screen" /></td>
    <td><img src="screenshots/ios/ios_14_Calls_Screen.png" width="190" alt="iOS Calls Screen" /></td>
  </tr>
  <tr>
    <td align="center"><b>Avatar Picker</b></td>
    <td align="center"><b>Select Contact</b></td>
    <td align="center"><b>New Contact</b></td>
    <td align="center"><b>Android Chats (Dark)</b></td>
  </tr>
  <tr>
    <td><img src="screenshots/ios/ios_04_Avatar_Screen.png" width="190" alt="iOS Avatar Selector" /></td>
    <td><img src="screenshots/ios/ios_07_SelectContact_Screen.png" width="190" alt="iOS Select Contact" /></td>
    <td><img src="screenshots/ios/ios_08_NewContact_Screen.png" width="190" alt="iOS New Contact" /></td>
    <td><img src="screenshots/android/11_HomeScreen_Dark.png" width="190" alt="Android Chats Dark" /></td>
  </tr>
</table>

### Android Captures

<table align="center">
  <tr>
    <td align="center"><b>Chats Hub</b></td>
    <td align="center"><b>Updates &amp; Stories</b></td>
    <td align="center"><b>Call Logs</b></td>
    <td align="center"><b>Contact Directory</b></td>
  </tr>
  <tr>
    <td><img src="screenshots/android/05_HomeScreen_Chats.png" width="190" alt="Android Chats Hub" /></td>
    <td><img src="screenshots/android/13_Status_Screen.png" width="190" alt="Android Status Screen" /></td>
    <td><img src="screenshots/android/14_Calls_Screen.png" width="190" alt="Android Calls Screen" /></td>
    <td><img src="screenshots/android/07_SelectContact_Screen.png" width="190" alt="Android Select Contact" /></td>
  </tr>
</table>

---

## Core Engineering Highlights

- **Persistent WebSocket Engine:** Custom `WebSocketProvider` managing full-duplex `wss://` sessions paired with dedicated React hooks (`useChatList`, `useSingleChat`, `useSendChat`, `useSendNewContact`, `useUserList`, `useUserProfile`).
- **Connection Heartbeat Monitor:** Client-side `useWebSocketPing` keep-alive loop dispatching `PING`/`PONG` frames to maintain active socket health across mobile network switches.
- **Auth-Gated Navigation Stack:** React Navigation v7 native stack and bottom tab navigators dynamically switching between Onboarding (`SignUp`, `Contact`, `Avatar`, `SignIn`) and Main (`Chats`, `Updates`, `Calls`, `SingleChat`, `Profile`, `Settings`) flows via `AuthProvider`.
- **Persisted Theme Parity:** First-class Light, Dark, and System appearance synchronization backed by `AsyncStorage` and React Native `Appearance` change listeners.
- **Multipart Media & Validation Layer:** Country-aware phone validation, 4-digit PIN verification, preset avatar selection, and custom gallery uploads using `expo-image-picker` and `FormData`.
- **Offline-Resilient UI Fallbacks:** Graceful fallback demo conversations and contacts allow immediate UI exploration even before connecting a live Jakarta EE backend instance.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Mobile Framework** | React Native `0.81.4`, Expo `SDK 54`, React `19.1.0` |
| **Language & Typing** | TypeScript `5.9.2` (strict typechecking via `npm run typecheck`) |
| **Styling & Motion** | NativeWind `v4.2` (Tailwind CSS v3), `react-native-reanimated`, `expo-linear-gradient`, `expo-blur` |
| **Navigation** | React Navigation v7 (`@react-navigation/native-stack`, `@react-navigation/bottom-tabs`) |
| **Storage & Media** | `@react-native-async-storage/async-storage`, `expo-image-picker` |
| **Backend Contract** | Java / Jakarta EE WebSockets (`@ServerEndpoint`), HTTP REST Servlets |

---

## Repository Structure

```text
Tappsy/
├── assets/                          # App icons, brand logos, and preset avatars
│   └── avatar/                      # Built-in onboarding avatar presets
├── screenshots/                     # Cross-platform iOS & Android UI captures
│   ├── android/
│   └── ios/
├── src/
│   ├── api/
│   │   └── UserService.ts           # REST endpoints for registration, login, avatar upload
│   ├── components/
│   │   ├── AnimatedLogo.tsx         # Reanimated splash logo component
│   │   ├── AuthProvider.tsx         # AsyncStorage-backed auth session context
│   │   ├── CircleShape.tsx          # Decorative geometry primitive
│   │   ├── FloatingElement.tsx      # Typed optional decorative layer
│   │   ├── GlassmorphicCard.tsx     # Translucent surface wrapper
│   │   ├── GradientBackground.tsx   # Brand gradient backdrop
│   │   └── UserContext.tsx          # Multi-step registration state provider
│   ├── screens/                     # 16 application screens (Auth, Tabs, Chat, Profile, Settings)
│   ├── socket/                      # WebSocketProvider, payload types, and custom hooks
│   ├── theme/
│   │   └── ThemeProvider.tsx        # Light / Dark / System theme engine
│   └── util/
│       ├── DateFormatter.ts         # Relative timestamp formatting
│       └── Validation.ts            # Country-aware phone, PIN, name, and image validators
├── .env.example                     # Safe environment template
├── App.tsx                          # Root providers and auth-gated navigator
├── app.json                         # Expo project manifest
├── LICENSE                          # MIT License
└── package.json                     # Dependencies and npm scripts
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ (v22 recommended) & **npm**
- **Expo Go** on a physical iOS/Android device, or Xcode iOS Simulator / Android Studio Emulator

### Installation & Local Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/theekshana-sudeepa/Tappsy.git
   cd Tappsy
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
   > `--legacy-peer-deps` resolves upstream peer dependency metadata between React 19 and `react-native-country-picker-modal`.

3. **Configure environment variables:**
   Copy the template file and point it at your backend server:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your local or hosted Jakarta EE backend endpoints:
   ```env
   EXPO_PUBLIC_APP_OWNER=Tappsy
   EXPO_PUBLIC_APP_VERSION=1.0
   EXPO_PUBLIC_APP_URL=https://your-backend-domain.example.com
   EXPO_PUBLIC_WS_URL=your-backend-domain.example.com
   ```

4. **Verify TypeScript types:**
   ```bash
   npm run typecheck
   ```

5. **Start the Expo development server:**
   ```bash
   npx expo start
   ```
   Press `i` for iOS Simulator, `a` for Android Emulator, or scan the QR code with **Expo Go**.

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for full details.

---

<div align="center">

Engineered by **Theekshana Sudeepa**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/theekshana-sudeepa/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/theekshana-sudeepa)
[![LexoraTech](https://img.shields.io/badge/LexoraTech-0084FF?style=flat-square&logo=safari&logoColor=white)](https://lexoratech.com)

</div>
