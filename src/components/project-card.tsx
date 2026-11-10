"use client";

import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";

type ProjectWindowProps = {
  name: string;
  description: string;
  status: "private" | "public" | "live" | "planned";
  tags: readonly string[];
  result: string;
  resultConfirmed: boolean;
  repo?: string;
  live?: string;
  demo?: string;
  context?: string;
  index: number;
};

export function ProjectWindow({
  name,
  description,
  status,
  tags,
  result,
  resultConfirmed,
  repo,
  live,
  demo,
  context,
  index,
}: ProjectWindowProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [zIndex, setZIndex] = useState(isOpen ? 100 : 10);
  const [pos, setPos] = useState({ x: 40 + index * 40, y: 40 + index * 40 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });

  const bringToFront = useCallback(() => {
    setZIndex(999);
    setIsOpen(true);
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement) return;
      e.preventDefault();
      bringToFront();
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      posStart.current = { ...pos };
    },
    [pos, bringToFront]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPos({ x: posStart.current.x + dx, y: posStart.current.y + dy });
    },
    []
  );

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const statusChip = (
    <span
      className={`chip ${
        status === "live"
          ? "chip-live"
          : status === "public"
          ? "chip-public"
          : status === "private"
          ? "chip-private"
          : "chip-planned"
      }`}
    >
      {status}
    </span>
  );

  if (!isOpen) return null;

  return (
    <article
      onMouseDown={onMouseDown}
      style={{
        zIndex,
        left: pos.x,
        top: pos.y,
        width: 320,
        position: "absolute",
      }}
      className="window transition-all duration-200"
    >
      <div className="window-title cursor-move">
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-accent" />
          {name}
        </span>
        <div className="window-controls">
          <button
            className="window-btn close"
            aria-label="Close window"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />
          <button className="window-btn minimize" aria-label="Minimize" />
          <button className="window-btn maximize" aria-label="Maximize" />
        </div>
      </div>
      <div className="window-body">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h3 className="font-inter font-semibold text-foreground">
              {name}
            </h3>
            {statusChip}
          </div>
          <p className="text-xs font-mono text-muted leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded border border-solid border-border/40 bg-panel/50 text-xs font-mono text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-mono text-xs font-semibold text-foreground">Result:</span>
          {resultConfirmed ? (
            <span className="font-mono text-xs text-foreground">{result}</span>
          ) : (
            <span className="font-mono text-xs text-warning">
              Result: pending · {result}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {repo ? (
            <Link
              href={repo}
              className="btn btn-outline btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
            </Link>
          ) : (
            <span className="flex items-center gap-2 rounded-full border border-solid border-accent/30 px-3 py-1 text-xs font-mono text-accent/60">
              Code · private
            </span>
          )}
          {live ? (
            <Link
              href={live}
              className="btn btn-outline btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live
            </Link>
          ) : null}
          {demo ? (
            <Link
              href={demo}
              className="btn btn-outline btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo
            </Link>
          ) : null}
        </div>

        {context && (
          <p className="mt-4 text-xs font-mono text-muted leading-relaxed">
            {context}
          </p>
        )}
      </div>
    </article>
  );
}
