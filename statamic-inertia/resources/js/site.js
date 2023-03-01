import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
// import { InertiaProgress } from '@inertiajs/progress'

// InertiaProgress.init()

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createInertiaApp({
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App }) {
        render(
            <QueryClientProvider client={queryClient}>
                <App
                    initialPage={JSON.parse(el.dataset.page)}
                    resolveComponent={(name) =>
                        require(`./Pages/${name}`).default
                    }
                />
            </QueryClientProvider>,
            el
        );
    },
});
