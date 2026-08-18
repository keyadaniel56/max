import React, { useState, useCallback } from "react";
import { load } from "@/external/bot-skeleton";
import { save_types } from "@/external/bot-skeleton/constants";
import masterBotV6 from "@/xml/master_bot_v6.xml";
import "./free-bots-panel.scss";

type TFreeBot = {
    id: string;
    name: string;
    description: string;
    icon: string;
    tags: string[];
    features: string[];
    xml: string;
};

const FREE_BOTS: TFreeBot[] = [
    {
        id: "master-bot-v6",
        name: "Master Bot V6",
        description:
            "Advanced over/under digit trading bot with martingale stake management, trend detection, configurable stop loss, and automatic trade rotation.",
        icon: "fa-solid fa-robot",
        tags: ["Digits", "Martingale", "Synthetic Index"],
        features: [
            "Over/Under 1HZ75V",
            "Auto stake adjustment",
            "Trend detection",
            "Stop loss & win target",
        ],
        xml: masterBotV6,
    },
];

type TFreeBotsPanelProps = {
    onClose: () => void;
};

const FreeBotsPanel = ({ onClose }: TFreeBotsPanelProps) => {
    const [loading, setLoading] = useState(false);

    const handleLoadBot = useCallback(
        async (bot: TFreeBot) => {
            const workspace = window.Blockly?.derivWorkspace;
            if (!workspace) return;

            setLoading(true);
            try {
                await load({
                    block_string: bot.xml,
                    file_name: bot.name,
                    workspace,
                    from: save_types.UNSAVED,
                    show_snackbar: true,
                });
                workspace.cleanUp();
                onClose();
            } catch {
                // load() handles its own error notifications
            } finally {
                setLoading(false);
            }
        },
        [onClose]
    );

    return (
        <div className="fb-overlay" onClick={onClose}>
            <div className="fb-panel" onClick={(e) => e.stopPropagation()}>
                <div className="fb-panel__header">
                    <div className="fb-panel__header-left">
                        <i className="fa-solid fa-bots" />
                        <h2>Free Bots</h2>
                    </div>
                    <button
                        type="button"
                        className="fb-panel__close"
                        onClick={onClose}
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>
                <p className="fb-panel__subtitle">
                    Click a bot to load it directly into the workspace and start
                    trading.
                </p>
                <div className="fb-panel__grid">
                    {FREE_BOTS.map((bot) => (
                        <button
                            key={bot.id}
                            type="button"
                            className="fb-card"
                            disabled={loading}
                            onClick={() => handleLoadBot(bot)}
                        >
                            <div className="fb-card__glow" />
                            <div className="fb-card__inner">
                                <div className="fb-card__badge">Free</div>
                                <div className="fb-card__icon">
                                    <i className={bot.icon} />
                                </div>
                                <h3 className="fb-card__name">{bot.name}</h3>
                                <p className="fb-card__desc">{bot.description}</p>
                                <div className="fb-card__tags">
                                    {bot.tags.map((tag) => (
                                        <span key={tag} className="fb-card__tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <ul className="fb-card__features">
                                    {bot.features.map((f) => (
                                        <li key={f}>
                                            <i className="fa-solid fa-check" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <span className="fb-card__cta">
                                    {loading ? (
                                        <>
                                            <i className="fa-solid fa-spinner fa-spin" /> Loading...
                                        </>
                                    ) : (
                                        <>
                                            Load to Workspace{" "}
                                            <i className="fa-solid fa-arrow-right" />
                                        </>
                                    )}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FreeBotsPanel;
