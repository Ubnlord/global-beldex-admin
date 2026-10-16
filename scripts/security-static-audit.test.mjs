import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const app=fs.readFileSync("src/App.tsx","utf8");
const supabase=fs.readFileSync("src/lib/supabase.ts","utf8");
test("browser client never references service-role secrets",()=>{assert.ok(!app.includes("SUPABASE_SERVICE_ROLE_KEY"));assert.ok(!supabase.includes("SERVICE_ROLE"));});
test("admin UI uses protected admin RPCs",()=>{for(const fn of ["admin_adjust_bdx_balance","admin_approve_deposit","admin_reject_deposit","admin_approve_withdrawal","admin_reject_withdrawal","admin_manage_investment"]) assert.ok(app.includes(fn),fn+" missing");});
test("admin gate is database-backed",()=>{assert.ok(app.includes("is_admin"));});
test("admin balance controls use BDX and require an idempotency reference",()=>{assert.ok(app.includes("admin_adjust_bdx_balance"));assert.ok(app.includes("p_reference:ref"));assert.ok(app.includes("Reference / idempotency key"));assert.ok(!app.includes("admin_fund_user"));assert.ok(!app.includes("admin_adjust_balance"));});
