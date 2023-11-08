import React, { ComponentPropsWithoutRef } from "react";
import "@finos/perspective-viewer/dist/css/themes.css";
import type {
    HTMLPerspectiveViewerElement,
    PerspectiveViewerConfig,
} from "@finos/perspective-viewer";
import { cn } from "@/utils/cn";

let TICKERS = [
    "AAPL.N",
    "AMZN.N",
    "QQQ.N",
    "NVDA.N",
    "TSLA.N",
    "META.N",
    "MSFT.N",
    "TLT.N",
    "XIV.N",
    "YY.N",
    "CSCO.N",
    "GOOGL.N",
    "PCLN.N",
];

let PORTFOLIOS = ["Portfolio 1", "Portfolio 2", "Portfolio 3", "Portfolio 4"];

const config: PerspectiveViewerConfig = {
    plugin: "Datagrid",
    plugin_config: {
        columns: {
            "(+)chg": { fg_gradient: 7.93, number_fg_mode: "bar" },
            "(-)chg": { fg_gradient: 8.07, number_fg_mode: "bar" },
            chg: { bg_gradient: 9.97, number_bg_mode: "gradient" },
        },
        editable: false,
        scroll_lock: true,
    },
    settings: true,
    group_by: ["name"],
    split_by: ["client"],
    columns: ["(-)chg", "chg", "(+)chg"],
    filter: [],
    sort: [["chg", "desc"]],
    expressions: [
        '//(-)chg\nif("chg"<0){"chg"}else{0}',
        '//(+)chg\nif("chg">0){"chg"}else{0}',
    ],
    aggregates: { "(-)chg": "avg", chg: "avg", "(+)chg": "avg" },
};

export type PerspectiveViewerProps = ComponentPropsWithoutRef<"div"> & {
    configProp?: Partial<PerspectiveViewerConfig>;
    refreshRateMillis?: number; // default 100
    portfolios?: string[];
    tickers?: string[];
    shouldRefresh?: boolean;
};

export default function PerspectiveViewer({
    className,
    configProp,
    portfolios = PORTFOLIOS,
    tickers = TICKERS,
    refreshRateMillis = 100,
    shouldRefresh = true,
}: PerspectiveViewerProps) {
    function newRows() {
        let rows = [];
        for (let x = 0; x < 50; x++) {
            rows.push({
                name: tickers[Math.floor(Math.random() * tickers.length)],
                client: portfolios[
                    Math.floor(Math.random() * portfolios.length)
                ],
                lastUpdate: new Date(),
                chg: Math.random() * 20 - 10,
                bid: Math.random() * 10 + 90,
                ask: Math.random() * 10 + 100,
                vol: Math.random() * 10 + 100,
            });
        }
        return rows;
    }

    const ref = React.useRef<HTMLPerspectiveViewerElement>(null);
    React.useEffect(() => {
        Promise.all([
            import("@finos/perspective-viewer"),
            import("@finos/perspective-viewer-datagrid"),
            import("@finos/perspective-viewer-d3fc"),
            import("@finos/perspective"),

            // @ts-ignore
            import("superstore-arrow/superstore.arrow"),
        ]).then(([_, __, ___, perspective, arr]) => {
            const worker = perspective.default.shared_worker();
            worker
                .table(newRows() as any, {
                    limit: 500,
                })
                .then((table) => {
                    if (ref.current) {
                        ref.current.load(Promise.resolve(table));
                        ref.current.restore({ ...config, ...configProp });
                    }
                    if (shouldRefresh) {
                        (function postRow() {
                            table.update(newRows() as any);
                            setTimeout(postRow, refreshRateMillis);
                        })();
                    }
                });
        });
    }, [ref]);

    return (
        <div className={cn("flex h-full items-stretch", className)}>
            <perspective-viewer
                ref={ref}
                style={{ minHeight: "800px", height: "100%", width: "100%" }} // somehow tailwind doesn't work here
            ></perspective-viewer>
        </div>
    );
}
