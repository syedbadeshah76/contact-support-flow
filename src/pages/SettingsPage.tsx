import { useState } from "react";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useDocumentMeta } from "@/lib/meta";

export function SettingsPage() {
  useDocumentMeta(
    "Settings - EDVANZ",
    "Tune the portal preferences, notifications, appearance, and privacy.",
  );

  const [displayName, setDisplayName] = useState("Emma Watson");
  const [email, setEmail] = useState("Emma.watson@gmail.com");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [largerText, setLargerText] = useState(false);
  const [liveReminders, setLiveReminders] = useState(false);
  const [dailyNudge, setDailyNudge] = useState(true);
  const [parentReport, setParentReport] = useState(true);
  const [screenTime, setScreenTime] = useState([60]);
  const [allowMessages, setAllowMessages] = useState(true);
  const [requirePin, setRequirePin] = useState(true);
  const [shareProgress, setShareProgress] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-16">
      {/* Header */}
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-blue-600">PREFERENCES</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">Setting</h1>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Tune the portal for your learner.
        </p>
      </div>

      {/* Card 1: Profile */}
      <section className="rounded-3xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-900">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="displayName" className="text-xs font-bold text-slate-800">
              Display Name
            </Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="h-11 rounded-full border-none bg-white px-4 font-semibold text-slate-800 shadow-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-bold text-slate-800">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-full border-none bg-white px-4 font-semibold text-slate-800 shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* Card 2: Appearance & language */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-black text-slate-900">Appearance & language</h2>
        <div className="space-y-3">
          {/* Row 1 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-4">
            <div>
              <h3 className="text-xs font-black text-slate-900">Dark Mode</h3>
              <p className="text-[11px] font-semibold text-slate-500">
                Use the moon button in the top bar to switch instantly
              </p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-4">
            <div>
              <h3 className="text-xs font-black text-slate-900">Language</h3>
              <p className="text-[11px] font-semibold text-slate-500">Interface language</p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-slate-800 shadow-xs focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>

          {/* Row 3 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-4">
            <div>
              <h3 className="text-xs font-black text-slate-900">Larger text</h3>
              <p className="text-[11px] font-semibold text-slate-500">
                Easier reading for younger learners
              </p>
            </div>
            <Switch checked={largerText} onCheckedChange={setLargerText} />
          </div>
        </div>
      </section>

      {/* Card 3: Notifications */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-black text-slate-900">Notifications</h2>
        <div className="space-y-3">
          {/* Row 1 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-4">
            <h3 className="text-xs font-black text-slate-900">Live class reminders</h3>
            <Switch checked={liveReminders} onCheckedChange={setLiveReminders} />
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-4">
            <h3 className="text-xs font-black text-slate-900">Daily challenge nudge</h3>
            <Switch checked={dailyNudge} onCheckedChange={setDailyNudge} />
          </div>

          {/* Row 3 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-4">
            <h3 className="text-xs font-black text-slate-900">Weekly parent report</h3>
            <Switch checked={parentReport} onCheckedChange={setParentReport} />
          </div>
        </div>
      </section>

      {/* Card 4: Privacy */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-black text-slate-900">Privacy</h2>
        <div className="space-y-3">
          {/* Row 1: Screen time */}
          <div className="flex items-center justify-between rounded-2xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-4 gap-4">
            <div>
              <h3 className="text-xs font-black text-slate-900">Daily screen time limit</h3>
              <p className="text-[11px] font-semibold text-slate-500">
                Currently {screenTime[0]} minutes
              </p>
            </div>
            <div className="w-48">
              <Slider
                value={screenTime}
                onValueChange={setScreenTime}
                min={15}
                max={180}
                step={15}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-4">
            <h3 className="text-xs font-black text-slate-900">Allow classmate messages</h3>
            <Switch checked={allowMessages} onCheckedChange={setAllowMessages} />
          </div>

          {/* Row 3 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-4">
            <h3 className="text-xs font-black text-slate-900">Require PIN for purchases</h3>
            <Switch checked={requirePin} onCheckedChange={setRequirePin} />
          </div>

          {/* Row 4 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-4">
            <h3 className="text-xs font-black text-slate-900">Share progress with others</h3>
            <Switch checked={shareProgress} onCheckedChange={setShareProgress} />
          </div>
        </div>
      </section>

      {/* Footer Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          onClick={handleSave}
          className="rounded-full bg-blue-600 px-6 py-6 text-xs font-bold text-white shadow-md hover:bg-blue-700 active:scale-95"
        >
          Save Changes
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Signed out")}
          className="rounded-full border-blue-200 px-6 py-6 text-xs font-bold text-blue-600 hover:bg-blue-50 active:scale-95"
        >
          <LogOut className="mr-1.5 size-4 text-blue-600" /> Log Out
        </Button>
      </div>
    </div>
  );
}
