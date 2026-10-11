import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync("src/App.tsx", "utf8");
const supabase = fs.readFileSync("src/lib/supabase.ts", "utf8");

test("browser client never references service-role secrets", () => {
  assert.ok(!app.includes("SUPABASE_SERVICE_ROLE_KEY"));
  assert.ok(!supabase.includes("SERVICE_ROLE"));
});

test("admin UI financial actions call the expected protected RPCs", () => {
  for (const fn of [
    "admin_fund_user",
    "admin_adjust_balance",
    "admin_approve_deposit",
    "admin_reject_deposit",
    "admin_approve_withdrawal",
    "admin_reject_withdrawal",
  ]) {
    assert.ok(app.includes(fn), fn + " missing");
  }
});

test("investment management is not mutated directly by the browser", () => {
  assert.ok(!/from\(["']user_investment["']\)\s*\.\s*(update|insert|upsert|delete)\s*\(/.test(app),
    "investment rows must not be mutated directly from the browser");
});

test("admin gate is database-backed", () => {
  assert.ok(app.includes("is_admin"));
});
