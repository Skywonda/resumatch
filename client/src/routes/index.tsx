import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout";
import Dashboard from "@/pages/dashboard";
import Tailor from "@/pages/tailor-resume";
import Enhance from "@/pages/enhance-resume";
import Rating from "@/pages/rate-resume";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Redirect from root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard and its nested routes */}
      <Route path="/dashboard" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="tailor-resume" element={<Tailor />} />
        <Route path="enhance-resume" element={<Enhance />} />
        <Route path="rate-resume" element={<Rating />} />
      </Route>
    </Route>
  )
);
