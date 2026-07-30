import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminSettings() {
  const supabase = await createClient();
  const { data: settingsData } = await supabase.from("settings").select("*");

  const settings = settingsData?.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, any>) || {};

  const companyInfo = settings.company_info || {};
  const socialLinks = settings.social_links || {};
  const seo = settings.seo || {};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">Global Settings</h1>
      
      <div className="grid gap-8">
        <form className="space-y-4 max-w-2xl">
          <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-2">Company Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" name="companyName" defaultValue={companyInfo.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" defaultValue={companyInfo.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={companyInfo.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" name="whatsapp" defaultValue={companyInfo.whatsapp} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" defaultValue={companyInfo.address} />
            </div>
          </div>
          <Button type="button" variant="default" className="bg-primary text-primary-foreground">Save Company Info</Button>
        </form>

        <form className="space-y-4 max-w-2xl">
          <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-2">Social Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input id="facebook" name="facebook" defaultValue={socialLinks.facebook} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input id="twitter" name="twitter" defaultValue={socialLinks.twitter} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" name="linkedin" defaultValue={socialLinks.linkedin} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" name="instagram" defaultValue={socialLinks.instagram} />
            </div>
          </div>
          <Button type="button" variant="default" className="bg-primary text-primary-foreground">Save Social Links</Button>
        </form>

        <form className="space-y-4 max-w-2xl">
          <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-2">SEO & Tracking</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta_pixel">Meta Pixel ID</Label>
              <Input id="meta_pixel" name="meta_pixel" defaultValue={seo.meta_pixel} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="google_analytics">Google Analytics ID</Label>
              <Input id="google_analytics" name="google_analytics" defaultValue={seo.google_analytics} />
            </div>
          </div>
          <Button type="button" variant="default" className="bg-primary text-primary-foreground">Save SEO Settings</Button>
        </form>
      </div>
    </div>
  );
}
