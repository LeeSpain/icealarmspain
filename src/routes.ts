
import { lazy } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactPage from "./pages/ContactPage";
import SignupPage from "./pages/SignupPage";
import ProductsPage from "./pages/ProductsPage";
import TestingPage from "./pages/TestingPage";

// Lazily load dashboard pages to reduce initial bundle size
const DashboardPage = lazy(() => import("./pages/Dashboard/DashboardPage"));
const MemberDashboard = lazy(() => import("./pages/Dashboard/MemberDashboard"));
const AdminDashboard = lazy(() => import("./pages/Dashboard/AdminDashboard"));
const AIGuardianDashboard = lazy(() => import("./pages/Dashboard/AIGuardianDashboard"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const UpdatePasswordPage = lazy(() => import("./pages/UpdatePasswordPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicyPage"));
const AccessibilityStatementPage = lazy(() => import("./pages/AccessibilityStatementPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const JobListingPage = lazy(() => import("./pages/JobListingPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const InvestorsPage = lazy(() => import("./pages/InvestorsPage"));
const PressPage = lazy(() => import("./pages/PressPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const LegalNoticePage = lazy(() => import("./pages/LegalNoticePage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const Error404Page = lazy(() => import("./pages/Error404Page"));
const Error500Page = lazy(() => import("./pages/Error500Page"));
const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const MaintenancePage = lazy(() => import("./pages/MaintenancePage"));
const OfflinePage = lazy(() => import("./pages/OfflinePage"));
const PasswordResetSuccessPage = lazy(() => import("./pages/PasswordResetSuccessPage"));
const AccountVerificationPage = lazy(() => import("./pages/AccountVerificationPage"));
const TwoFactorAuthPage = lazy(() => import("./pages/TwoFactorAuthPage"));
const EmailPreferencesPage = lazy(() => import("./pages/EmailPreferencesPage"));
const ReferralProgramPage = lazy(() => import("./pages/ReferralProgramPage"));
const IntegrationsPage = lazy(() => import("./pages/IntegrationsPage"));
const ApiDocsPage = lazy(() => import("./pages/ApiDocsPage"));
const SecurityPage = lazy(() => import("./pages/SecurityPage"));
const CompliancePage = lazy(() => import("./pages/CompliancePage"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const MarketplacePage = lazy(() => import("./pages/MarketplacePage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const WebinarsPage = lazy(() => import("./pages/WebinarsPage"));
const DownloadsPage = lazy(() => import("./pages/DownloadsPage"));
const KnowledgeBasePage = lazy(() => import("./pages/KnowledgeBasePage"));
const TrainingPage = lazy(() => import("./pages/TrainingPage"));
const SupportTicketsPage = lazy(() => import("./pages/SupportTicketsPage"));
const ForumsPage = lazy(() => import("./pages/ForumsPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const AccountSettingsPage = lazy(() => import("./pages/AccountSettingsPage"));
const PrivacySettingsPage = lazy(() => import("./pages/PrivacySettingsPage"));
const SecuritySettingsPage = lazy(() => import("./pages/SecuritySettingsPage"));
const BillingSettingsPage = lazy(() => import("./pages/BillingSettingsPage"));
const PreferencesSettingsPage = lazy(() => import("./pages/PreferencesSettingsPage"));
const AccessibilitySettingsPage = lazy(() => import("./pages/AccessibilitySettingsPage"));
const LegalSettingsPage = lazy(() => import("./pages/LegalSettingsPage"));
const LogoutPage = lazy(() => import("./pages/LogoutPage"));

export const routes = [
  {
    path: "/",
    element: HomePage,
    protected: false,
  },
  {
    path: "/about",
    element: AboutPage,
    protected: false,
  },
  {
    path: "/contact",
    element: ContactPage,
    protected: false,
  },
  {
    path: "/login",
    element: LoginPage,
    protected: false,
  },
  {
    path: "/signup",
    element: SignupPage,
    protected: false,
  },
  {
    path: "/products",
    element: ProductsPage,
    protected: false,
  },
  {
    path: "/testing",
    element: TestingPage,
    protected: false,
  },
  {
    path: "/dashboard",
    element: DashboardPage,
    protected: true,
  },
  {
    path: "/member-dashboard",
    element: MemberDashboard,
    protected: true,
    allowedRoles: ["member"],
  },
  {
    path: "/admin-dashboard",
    element: AdminDashboard,
    protected: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/ai-guardian",
    element: AIGuardianDashboard,
    protected: true,
    allowedRoles: ["member", "admin"],
  },
  {
    path: "/payment",
    element: PaymentPage,
    protected: true,
  },
  {
    path: "/profile",
    element: ProfilePage,
    protected: true,
  },
  {
    path: "/reset-password",
    element: ResetPasswordPage,
    protected: false,
  },
  {
    path: "/update-password",
    element: UpdatePasswordPage,
    protected: true,
  },
  {
    path: "/terms-of-service",
    element: TermsOfServicePage,
    protected: false,
  },
  {
    path: "/privacy-policy",
    element: PrivacyPolicyPage,
    protected: false,
  },
  {
    path: "/cookie-policy",
    element: CookiePolicyPage,
    protected: false,
  },
  {
    path: "/accessibility-statement",
    element: AccessibilityStatementPage,
    protected: false,
  },
  {
    path: "/pricing",
    element: PricingPage,
    protected: false,
  },
  {
    path: "/features",
    element: FeaturesPage,
    protected: false,
  },
  {
    path: "/support",
    element: SupportPage,
    protected: false,
  },
  {
    path: "/faq",
    element: FaqPage,
    protected: false,
  },
  {
    path: "/blog",
    element: BlogPage,
    protected: false,
  },
  {
    path: "/blog/:slug",
    element: BlogPostPage,
    protected: false,
  },
  {
    path: "/careers",
    element: CareersPage,
    protected: false,
  },
  {
    path: "/careers/:id",
    element: JobListingPage,
    protected: false,
  },
  {
    path: "/team",
    element: TeamPage,
    protected: false,
  },
  {
    path: "/investors",
    element: InvestorsPage,
    protected: false,
  },
  {
    path: "/press",
    element: PressPage,
    protected: false,
  },
  {
    path: "/contact-us",
    element: ContactUsPage,
    protected: false,
  },
  {
    path: "/legal-notice",
    element: LegalNoticePage,
    protected: false,
  },
  {
    path: "/sitemap",
    element: SitemapPage,
    protected: false,
  },
  {
    path: "/404",
    element: Error404Page,
    protected: false,
  },
  {
    path: "/500",
    element: Error500Page,
    protected: false,
  },
  {
    path: "/coming-soon",
    element: ComingSoonPage,
    protected: false,
  },
  {
    path: "/maintenance",
    element: MaintenancePage,
    protected: false,
  },
  {
    path: "/offline",
    element: OfflinePage,
    protected: false,
  },
  {
    path: "/password-reset-success",
    element: PasswordResetSuccessPage,
    protected: false,
  },
  {
    path: "/account-verification",
    element: AccountVerificationPage,
    protected: false,
  },
  {
    path: "/two-factor-auth",
    element: TwoFactorAuthPage,
    protected: true,
  },
  {
    path: "/email-preferences",
    element: EmailPreferencesPage,
    protected: true,
  },
  {
    path: "/referral-program",
    element: ReferralProgramPage,
    protected: true,
  },
  {
    path: "/integrations",
    element: IntegrationsPage,
    protected: true,
  },
  {
    path: "/api-docs",
    element: ApiDocsPage,
    protected: true,
  },
  {
    path: "/security",
    element: SecurityPage,
    protected: true,
  },
  {
    path: "/compliance",
    element: CompliancePage,
    protected: true,
  },
  {
    path: "/case-studies",
    element: CaseStudiesPage,
    protected: false,
  },
  {
    path: "/testimonials",
    element: TestimonialsPage,
    protected: false,
  },
  {
    path: "/partners",
    element: PartnersPage,
    protected: false,
  },
  {
    path: "/marketplace",
    element: MarketplacePage,
    protected: false,
  },
  {
    path: "/community",
    element: CommunityPage,
    protected: false,
  },
  {
    path: "/events",
    element: EventsPage,
    protected: false,
  },
  {
    path: "/webinars",
    element: WebinarsPage,
    protected: false,
  },
  {
    path: "/downloads",
    element: DownloadsPage,
    protected: true,
  },
  {
    path: "/knowledge-base",
    element: KnowledgeBasePage,
    protected: false,
  },
  {
    path: "/training",
    element: TrainingPage,
    protected: true,
  },
  {
    path: "/support-tickets",
    element: SupportTicketsPage,
    protected: true,
  },
  {
    path: "/forums",
    element: ForumsPage,
    protected: false,
  },
  {
    path: "/chat",
    element: ChatPage,
    protected: true,
  },
  {
    path: "/notifications",
    element: NotificationsPage,
    protected: true,
  },
  {
    path: "/settings",
    element: SettingsPage,
    protected: true,
  },
  {
    path: "/account-settings",
    element: AccountSettingsPage,
    protected: true,
  },
  {
    path: "/privacy-settings",
    element: PrivacySettingsPage,
    protected: true,
  },
  {
    path: "/security-settings",
    element: SecuritySettingsPage,
    protected: true,
  },
  {
    path: "/billing-settings",
    element: BillingSettingsPage,
    protected: true,
  },
  {
    path: "/preferences-settings",
    element: PreferencesSettingsPage,
    protected: true,
  },
  {
    path: "/accessibility-settings",
    element: AccessibilitySettingsPage,
    protected: true,
  },
  {
    path: "/legal-settings",
    element: LegalSettingsPage,
    protected: true,
  },
  {
    path: "/logout",
    element: LogoutPage,
    protected: true,
  },
  {
    path: "*",
    element: NotFoundPage,
    protected: false,
  },
];
