import PageHero from "@/components/PageHero";
import { Card } from "@/components/ui/card";
import { COURSE_CATEGORIES, ALL_COURSES } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { Search, BookOpen, Clock, Award } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";

export default function Academy() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const filtered = useMemo(() => {
    return ALL_COURSES.filter(c => (cat === "All" || c.category === cat) && c.name.toLowerCase().includes(q.toLowerCase()));
  }, [q, cat]);

  return (
    <>
      <PageHero eyebrow="Training Academy" title={<>30+ programs. <span className="text-accent">One outcome — your dream job.</span></>} sub="Industry-aligned curriculum, live mentor sessions and end-to-end placement support." />
      <section className="section-py container mx-auto container-px">
        <div className="mb-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses…" value={q} onChange={e => setQ(e.target.value)} className="pl-10 h-11" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={cat === "All" ? "default" : "outline"} onClick={() => setCat("All")}>All</Button>
            {COURSE_CATEGORIES.map(c => (
              <Button key={c.name} size="sm" variant={cat === c.name ? "default" : "outline"} onClick={() => setCat(c.name)}>{c.name}</Button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(c => (
            <Card key={c.name} className="p-6 border-border hover:shadow-elegant hover:border-accent/50 transition group">
              <div className="flex items-center gap-2 text-xs text-accent font-semibold mb-2">
                <BookOpen className="h-3.5 w-3.5" /> {c.category}
              </div>
              <h3 className="font-display text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">{c.name}</h3>
              <div className="flex gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 6-12 weeks</span>
                <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5" /> Certified</span>
              </div>
              <Button size="sm" variant="outline" className="w-full">Enquire about {c.name.length > 18 ? "this course" : c.name}</Button>
            </Card>
          ))}
          {filtered.length === 0 && <p className="text-muted-foreground col-span-full text-center py-12">No courses match your search.</p>}
        </div>
      </section>
      <section className="section-py bg-secondary/40 border-y border-border">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-xs font-bold tracking-[0.25em] text-accent uppercase mb-3">Enroll Now</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">Student Registration</h2>
            <p className="mt-3 text-muted-foreground text-lg">Fill the form and our counsellor will help you choose the right course, batch and payment option.</p>
            <ul className="mt-6 space-y-2 text-sm text-foreground">
              <li>✅ EMI starting ₹2,499/month</li>
              <li>✅ Scholarship up to 30% for early enrolment</li>
              <li>✅ 100% placement assistance</li>
              <li>✅ Live + recorded sessions</li>
            </ul>
          </div>
          <Card className="p-8 shadow-elegant"><InquiryForm /></Card>
        </div>
      </section>
    </>
  );
}