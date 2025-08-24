import { createBrowserRouter } from "react-router-dom";
import AnalyticsPage from "./pages/analytics-page";
import SettingsPage from "./pages/settings/settings-page";
import Dashboard from "./pages/dashboard/dashboard";
import LoginPage from "./pages/auth/login_page";
import ProductsPage from "./pages/products/products_page";
import CreateProductPage from "./pages/products/create";
import UpdateProductPage from "./pages/products/update";
import ModelsPage from "./pages/models/models_page";
import FaqsPage from "./pages/faq/faqs_page";
import ContactMessagesPage from "./pages/contact-messages/contact-messages-page";
import TestimonialsPage from "./pages/testimonials/testimonials_page";
import SeoPage from "./pages/seos/seos_page";
import UpdateSeoPage from "./pages/seos/update_seo_page";
import OrdersPage from "./pages/orders/orders_page";
import OrderDetailsPage from "./pages/orders/order_details_page";
import { ProtectedLayout } from "./components/layout/protected_layout";
import PoliciesPage from "./pages/policies";
import UpdatePolicyPage from "./pages/policies/update";
import PromotionsPage from "./pages/promotions/promotions_page";
import PromoCodesPage from "./pages/promo-codes";

const router = createBrowserRouter([
    {
        path: '/',
        element: 
            <ProtectedLayout />
        ,
        children: [
            {
                index: true,    
                element: <Dashboard />
            },
            {
                path: '/products',
                element: <ProductsPage />
            },
            {
                path: '/contact-messages',
                element: <ContactMessagesPage />
            },
            {
                path: '/testimonials',
                element: <TestimonialsPage />
            },
            {
                path: '/orders',
                element: <OrdersPage />
            },
            {
                path: '/orders/:id',
                element: <OrderDetailsPage />
            },
            {
                path: '/seo',
                element: <SeoPage />
            },
            {
                path: '/seo/:id/update',
                element: <UpdateSeoPage />
            },
            {
                path: '/products/create',
                element: <CreateProductPage />
            },
            {
                path: '/products/:id/update',
                element: <UpdateProductPage />
            },
            {
                path: '/models',
                element: <ModelsPage />
            },
            {
                path: '/faqs',
                element: <FaqsPage />
            },
            {
                path: '/analytics',
                element: <AnalyticsPage />
            },
            {
                path: '/settings',
                element: <SettingsPage />
            },
            {
                path: '/policies',
                element: <PoliciesPage />
            },
            {
                path: '/policies/:id/update',
                element: <UpdatePolicyPage />
            },
            {
                path: '/promotions',
                element: <PromotionsPage />
            },
            {
                path: '/promo-codes',
                element: <PromoCodesPage />
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />
    }
])


export default router