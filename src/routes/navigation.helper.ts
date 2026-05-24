import { useNavigate } from "react-router-dom";
import { AppRoute } from "./routes.enum";

type RouteParams = Record<string, number | string>;

export const buildRoute = (route: AppRoute, params?: RouteParams): string => {
  if (!params) return route;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) =>
    searchParams.set(key, String(value)),
  );

  return `${route}?${searchParams.toString()}`;
};

export const useAppNavigate = () => {
  const navigate = useNavigate();

  return (route: AppRoute, params?: RouteParams) => {
    navigate(buildRoute(route, params));
  };
};
