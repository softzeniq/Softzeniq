import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { services } from '@/data/Service';

export async function GET() {
  try {
    const servicesToInsert = services.map((s, index) => ({
      slug: s.slug,
      icon_name: s.icon.name || 'Code2', // Lucide icons have a 'name' property on the function or we might need to map them manually
      title: s.title,
      short_description: s.short,
      description: s.description,
      benefits: s.benefits,
      status: 'published',
      display_order: index,
    }));

    // For lucide icons imported as objects/functions, getting their string name can be tricky if they are minified.
    // Let's hardcode the icon names based on the data/Service.ts file:
    // Code2, ShoppingCart, Cpu, Palette, Search, Megaphone, Smartphone, Rocket
    const iconMap: Record<string, string> = {
      'web': 'Code2',
      'ecommerce': 'ShoppingCart',
      'software': 'Cpu',
      'mobile': 'Smartphone',
      'design': 'Palette',
      'seo': 'Search',
      'ads': 'Megaphone',
      'saas': 'Rocket'
    };

    servicesToInsert.forEach(s => {
        s.icon_name = iconMap[s.slug] || 'Code2';
    });

    const { error } = await supabase.from('services').insert(servicesToInsert);

    if (error) {
      console.error('Error seeding services:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Services seeded successfully!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
