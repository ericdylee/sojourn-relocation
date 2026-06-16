import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import type { Lead } from "./schema";
import { sendLead } from "./sendLead";

const validLead: Lead = {
  intent: "relocation",
  name: "A",
  email: "a@b.com",
  phone: "",
  company: "",
  message: "hi",
  website: "",
};

describe("sendLead", () => {
  beforeEach(() => {
    process.env.WEB3FORMS_KEY = "test-key";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("POSTs JSON to web3forms with access_key and lead fields, returns ok:true on 200", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendLead(validLead);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ "Content-Type": "application/json" });

    const body = JSON.parse(init.body);
    expect(body.access_key).toBe("test-key");
    expect(body.name).toBe(validLead.name);
    expect(body.email).toBe(validLead.email);
    expect(body.message).toBe(validLead.message);
    expect(body.intent).toBe(validLead.intent);

    expect(result).toEqual({ ok: true });
  });

  it("returns ok:false with an error on a non-200 response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendLead(validLead);

    expect(result.ok).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("returns ok:false when WEB3FORMS_KEY is missing", async () => {
    delete process.env.WEB3FORMS_KEY;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendLead(validLead);

    expect(result).toEqual({ ok: false, error: "Email not configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
