"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
const queryClient = new QueryClient();

type TQueryProps = PropsWithChildren;
export default function TanstackQueryProvider({ children }: TQueryProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
