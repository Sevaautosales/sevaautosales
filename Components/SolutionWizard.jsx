import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Car,
  CarFront,
  Truck,
  Bike,
  CheckCircle2,
  Users,
  PersonStanding,
  Hand,
  Armchair,
  Accessibility,
  Joystick,
  CircleDot,
  Settings2,
  ArrowLeftRight,
  ShieldCheck,
  RotateCw,
  ArrowUpToLine,
  TrendingUp,
  GripHorizontal,
  Send,
  Phone,
  Mail,
} from 'lucide-react';

const SuvIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Body outline */}
    <path d="M22 13v3h-2" />
    <path d="M4 16H2v-4.5c0-1 1-1.5 1-2L4.5 6A2 2 0 0 1 6 5h7c1 0 1.5 0 3 2l2.5 3h2c1 0 1.5 1 1.5 3" />
    {/* Underbody */}
    <path d="M9 16h5" />
    {/* Wheels */}
    <circle cx="6.5" cy="16" r="2.5" />
    <circle cx="16.5" cy="16" r="2.5" />
    {/* Windows */}
    <path d="M13.5 10H5.5L4.5 6h8.5Z" />
    <path d="M13.5 10V6h1.5l1.5 4Z" />
  </svg>
);

const MOBILITY_PROFILES = [
  {
    id: 'hand-impairment',
    icon: <Hand className="w-7 h-7" />,
    title: 'Limited Hand / Arm Mobility',
    desc: 'Difficulty gripping the steering wheel, using indicators, or braking.',
  },
  {
    id: 'lower-limb',
    icon: <PersonStanding className="w-7 h-7" />,
    title: 'Lower Limb Difference',
    desc: 'Paralysis, prosthesis or weakness in legs affecting accelerator / brake pedals.',
  },
  {
    id: 'wheelchair-user',
    icon: <Accessibility className="w-7 h-7" />,
    title: 'Wheelchair User',
    desc: 'Require transfer from wheelchair into vehicle or in-vehicle wheelchair setup.',
  },
  {
    id: 'passenger-assist',
    icon: <Users className="w-7 h-7" />,
    title: 'Passenger / Carer Assistance',
    desc: 'Need to safely carry a person with disabilities as a passenger.',
  },
];

const VEHICLE_TYPES = [
  {
    id: 'hatchback',
    icon: <Car className="w-8 h-8" />,
    label: 'Hatchback',
    examples: 'Maruti Swift, Hyundai i20',
  },
  {
    id: 'sedan',
    icon: <CarFront className="w-8 h-8  " />,
    label: 'Sedan',
    examples: 'Honda City, Maruti Ciaz',
  },
  {
    id: 'suv',
    icon: <SuvIcon className="w-8 h-8" />,
    label: 'SUV / MUV',
    examples: 'Mahindra XUV, Toyota Innova',
  },
  {
    id: 'bike',
    icon: <Bike className="w-8 h-8" />,
    label: 'Two-Wheeler',
    examples: 'Honda Activa, Royal Enfield',
  },
];

const getModifications = (profile, vehicle) => {
  if (vehicle === 'bike') {
    return [
      { id: 'side-wheels', icon: <CircleDot className="w-6 h-6" />, title: 'Side-Wheels (Retrofit)', desc: 'Attachable side training wheels for enhanced balance and stability.', badge: 'Most Popular' },
      { id: 'side-car', icon: <Users className="w-6 h-6" />, title: 'Side-Car Attachment', desc: 'Secure side-car for a passenger or additional equipment.', badge: null },
      { id: 'custom-bike-options', icon: <Settings2 className="w-6 h-6" />, title: 'Custom Modification', desc: 'Speak to our engineers to build a personalized bike adaptation.', badge: null }
    ];
  }

  // Car / Sedan / SUV specific modifications
  return [
    { id: 'hand-controls', icon: <Joystick className="w-6 h-6" />, title: 'Hand Controls', desc: 'Push/pull hand-operated controls for acceleration and braking.', badge: 'Most Popular' },
    { id: 'auto-clutch', icon: <Settings2 className="w-6 h-6" />, title: 'Automatic Clutch (Auto-Clutch)', desc: 'Electronic automatic clutch system for effortless gear shifting.', badge: 'Recommended' },
    { id: 'custom-car-options', icon: <Car className="w-6 h-6" />, title: 'Custom Modification', desc: 'Speak to our engineers to build a personalized car adaptation tailored to your needs.', badge: null }
  ];
};

function Step1({ selected, onSelect }) {
  return (
    <div>
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
        Select the option that best describes your mobility needs. This helps us suggest the right modifications for you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOBILITY_PROFILES.map(p => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            aria-pressed={selected === p.id}
            className={`
              relative text-left p-5 rounded-xl border-2 transition-colors duration-75 group outline-none focus:outline-none focus:ring-0
              ${selected === p.id
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }
            `}
          >
            {selected === p.id && (
              <span className="absolute top-3 right-3 text-blue-600 dark:text-blue-400">
                <CheckCircle2 size={18} />
              </span>
            )}
            <span className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200 ${selected === p.id ? 'bg-blue-600 text-white' : 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-800 group-hover:text-blue-700'}`}>
              {p.icon}
            </span>
            <h3 className={`font-semibold text-lg mb-2 ${selected === p.id ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'}`}>
              {p.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {p.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({ selected, onSelect }) {
  return (
    <div>
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
        Tell us about your vehicle so we can recommend compatible modifications.
      </p>
      <div className="grid grid-cols-2 gap-4">
        {VEHICLE_TYPES.map(v => (
          <button
            key={v.id}
            onClick={() => onSelect(v.id)}
            aria-pressed={selected === v.id}
            className={`
              relative text-left p-5 rounded-xl border-2 transition-colors duration-75 group outline-none focus:outline-none focus:ring-0
              ${selected === v.id
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }
            `}
          >
            {selected === v.id && (
              <span className="absolute top-3 right-3 text-blue-600 dark:text-blue-400">
                <CheckCircle2 size={18} />
              </span>
            )}
            <span className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200 ${selected === v.id ? 'bg-blue-600 text-white' : 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-800 group-hover:text-blue-700'}`}>
              {v.icon}
            </span>
            <h3 className={`font-semibold text-lg mb-2 ${selected === v.id ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'}`}>
              {v.label}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{v.examples}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step3({ mobilityProfile, vehicleType, selected, onToggle }) {
  const options = getModifications(mobilityProfile, vehicleType);
  return (
    <div>
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
        Based on your needs, we recommend the following modifications. Select the primary modification you are interested in.
      </p>
      <div className="space-y-3">
        {options.map(mod => {
          const isSelected = selected.includes(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => onToggle(mod.id)}
              aria-pressed={isSelected}
              className={`
                w-full flex items-center justify-between gap-4 p-5 rounded-xl border-2 text-left transition-colors duration-75 outline-none focus:outline-none focus:ring-0
                ${isSelected
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }
              `}
            >
              <div className="flex items-center gap-5 flex-1 min-w-0">
                <span className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400'}`}>
                  {mod.icon}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className={`font-semibold text-lg ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'}`}>
                      {mod.title}
                    </h3>
                    {mod.badge && (
                      <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-800/50 uppercase tracking-wide">
                        {mod.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{mod.desc}</p>
                </div>
              </div>
              <div className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200 ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'}`}>
                {isSelected && <CheckCircle2 size={16} className="text-white" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step4({ mobilityProfile, vehicleType, selectedMods, onSubmit, submitting, submitted, error }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', message: '' });
  const [errors, setErrors] = useState({});

  const profileLabel = MOBILITY_PROFILES.find(p => p.id === mobilityProfile)?.title || '';
  const vehicleLabel = VEHICLE_TYPES.find(v => v.id === vehicleType)?.label || '';
  const modOptions = getModifications(mobilityProfile, vehicleType);
  const selectedModDetails = modOptions.filter(m => selectedMods.includes(m.id));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Valid 10-digit phone required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.city.trim()) e.city = 'City is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    onSubmit(form);
  };

  if (submitted && !error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-5 shadow-lg shadow-green-500/20">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Sent!</h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          Thank you, <strong className="text-slate-800 dark:text-slate-100">{form.name || 'Friend'}</strong>! Our team will contact you soon to discuss your personalised solution.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary card */}
      <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-900/50 flex items-center justify-center">
            <CheckCircle2 size={18} className="text-blue-700 dark:text-blue-400" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide">Your Build Summary</h4>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <span className="px-3.5 py-1.5 text-sm font-semibold rounded-md bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 shadow-sm">{profileLabel}</span>
          <span className="px-3.5 py-1.5 text-sm font-semibold rounded-md bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 shadow-sm">{vehicleLabel}</span>
          {selectedModDetails.map(m => (
            <span key={m.id} className="px-3.5 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-sm">{m.title}</span>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4 pb-2">
        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 flex items-start text-left">
            <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            <div>
              <h4 className="text-sm font-semibold text-red-800 dark:text-red-400">Submission Failed</h4>
              <p className="text-sm text-red-600 dark:text-red-300 mt-1">There was a problem sending your request. Please try again or contact us directly.</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="wiz-name" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">Your Name *</label>
            <input
              id="wiz-name"
              type="text"
              placeholder="Rahul Sharma"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${errors.name ? 'border-red-500 text-red-900 dark:text-red-300 bg-red-50 dark:bg-red-900/10' : 'border-slate-300 dark:border-slate-600'}`}
            />
            {errors.name && <p className="text-xs font-medium text-red-500 mt-1.5">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="wiz-phone" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">Mobile Number *</label>
            <input
              id="wiz-phone"
              type="tel"
              placeholder="9876543210"
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${errors.phone ? 'border-red-500 text-red-900 dark:text-red-300 bg-red-50 dark:bg-red-900/10' : 'border-slate-300 dark:border-slate-600'}`}
            />
            {errors.phone && <p className="text-xs font-medium text-red-500 mt-1.5">{errors.phone}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="wiz-email" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">Email Address *</label>
            <input
              id="wiz-email"
              type="email"
              placeholder="rahul@example.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${errors.email ? 'border-red-500 text-red-900 dark:text-red-300 bg-red-50 dark:bg-red-900/10' : 'border-slate-300 dark:border-slate-600'}`}
            />
            {errors.email && <p className="text-xs font-medium text-red-500 mt-1.5">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="wiz-city" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">City *</label>
            <input
              id="wiz-city"
              type="text"
              placeholder="e.g. Surat, Mumbai, Delhi..."
              value={form.city}
              onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${errors.city ? 'border-red-500 text-red-900 dark:text-red-300 bg-red-50 dark:bg-red-900/10' : 'border-slate-300 dark:border-slate-600'}`}
            />
            {errors.city && <p className="text-xs font-medium text-red-500 mt-1.5">{errors.city}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="wiz-message" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">Additional Notes <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">(optional)</span></label>
          <textarea
            id="wiz-message"
            rows={3}
            placeholder="Any specific details about your vehicle or requirements..."
            value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
          />
        </div>
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3.5 px-6 rounded-lg shadow-sm transition hover:-translate-y-0.5"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} /> Get My Free Consultation
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const STEPS = [
  { id: 1, label: 'Mobility Profile', short: 'Profile' },
  { id: 2, label: 'Your Vehicle', short: 'Vehicle' },
  { id: 3, label: 'Modifications', short: 'Mods' },
  { id: 4, label: 'Get a Quote', short: 'Quote' },
];

function SolutionWizard() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [mobilityProfile, setMobilityProfile] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [selectedMods, setSelectedMods] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleMod = (id) => {
    setSelectedMods(prev =>
      prev.includes(id) ? [] : [id]
    );
  };

  const isStepAccessible = (targetStep) => {
    if (targetStep === 1) return true;
    if (targetStep === 2) return !!mobilityProfile;
    if (targetStep === 3) return !!mobilityProfile && !!vehicleType;
    if (targetStep === 4) return !!mobilityProfile && !!vehicleType && selectedMods.length > 0;
    return false;
  };

  const handleStepClick = (targetStep) => {
    if (isStepAccessible(targetStep) && targetStep !== step) {
      if (step === 2 && targetStep === 3) {
        setSelectedMods([]); // reset mods when going naturally to step 3
      }
      setStep(targetStep);
    }
  };

  const canNext = () => {
    if (step === 1) return !!mobilityProfile;
    if (step === 2) return !!vehicleType;
    if (step === 3) return selectedMods.length > 0;
    return true;
  };

  const next = () => {
    if (step === 2) setSelectedMods([]); // reset mods when going to step 3
    setStep(s => Math.min(STEPS.length, s + 1));
  };
  const prev = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError(false);

    const vLabel = VEHICLE_TYPES.find(v => v.id === vehicleType)?.label || '';
    const pLabel = MOBILITY_PROFILES.find(p => p.id === mobilityProfile)?.title || '';
    const availableMods = getModifications(mobilityProfile, vehicleType);
    const mLabels = selectedMods.map(id => availableMods.find(m => m.id === id)?.title).join(', ');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c705a980-4170-4a28-adb4-1465b5e520cd",
          subject: "New Solution Wizard Lead - Seva Auto Sales",
          from_name: "Seva Auto Sales Website",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicle_type: vLabel,
          modifications: `[${pLabel}] ${mLabels}`,
          message: `City: ${formData.city}\n\nCustomer Notes:\n${formData.message || 'None'}`
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setError(false);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Wizard auto-email dispatch failed:", error);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="solution-wizard"
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden"
      aria-label="Build Your Solution Wizard"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-blue-500 opacity-5 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-orange-500 opacity-5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Custom Modification Plan
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Build Your Perfect <span className="text-blue-600 dark:text-blue-400">Solution</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Answer a few simple questions and we'll recommend the ideal vehicle modifications for your independence.
          </p>
        </div>

        {/* Wizard Card */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">

            {/* Progress Bar + Steps */}
            <div className="px-6 md:px-10 pt-8 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                {STEPS.map((s, idx) => {
                  const accessible = isStepAccessible(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleStepClick(s.id)}
                      disabled={!accessible}
                      className={`flex-1 flex flex-col items-center relative focus:outline-none transition-opacity ${accessible ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed opacity-60'}`}
                    >
                      {/* Connector line */}
                      {idx < STEPS.length - 1 && (
                        <div className={`absolute top-4 left-1/2 w-full h-1 transition-colors duration-500 ${step > s.id ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-600'}`} />
                      )}
                      {/* Step dot */}
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${step > s.id
                        ? 'bg-blue-600 text-white'
                        : step === s.id
                          ? 'bg-blue-600 text-white ring-4 ring-blue-600/20'
                          : 'bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-200 dark:border-slate-600'
                        }`}>
                        {step > s.id ? <CheckCircle2 size={16} /> : s.id}
                      </div>
                      <p className={`mt-2 text-sm font-medium hidden sm:block transition-colors duration-300 ${step === s.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                        {s.label}
                      </p>
                      <p className={`mt-2 text-xs font-medium block sm:hidden transition-colors duration-300 ${step === s.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                        {s.short}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step content */}
            <div className="px-6 md:px-10 py-8">
              <div className="mb-8 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {step === 1 && 'What are your mobility needs?'}
                  {step === 2 && 'What type of vehicle do you have?'}
                  {step === 3 && 'Recommended modifications for you'}
                  {step === 4 && 'Get your free consultation'}
                </h3>
              </div>

              {/* Animated step wrapper */}
              <div key={step} style={{ animation: 'wizardFadeIn 0.3s ease-out forwards' }}>
                {step === 1 && <Step1 selected={mobilityProfile} onSelect={setMobilityProfile} />}
                {step === 2 && <Step2 selected={vehicleType} onSelect={setVehicleType} />}
                {step === 3 && (
                  <Step3
                    mobilityProfile={mobilityProfile}
                    vehicleType={vehicleType}
                    options={getModifications(mobilityProfile, vehicleType)}
                    selected={selectedMods}
                    onToggle={toggleMod}
                  />
                )}
                {step === 4 && (
                  <Step4
                    mobilityProfile={mobilityProfile}
                    vehicleType={vehicleType}
                    selectedMods={selectedMods}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    submitted={submitted}
                    error={error}
                  />
                )}
              </div>
            </div>

            {/* Navigation footer */}
            {(!submitted || error) && (
              <div className="px-6 md:px-10 py-5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-4">
                <button
                  onClick={prev}
                  disabled={step === 1}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ArrowLeft size={16} /> <span className="hidden sm:inline">Back</span>
                </button>

                {step < STEPS.length ? (
                  <button
                    onClick={next}
                    disabled={!canNext()}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-sm transition-all duration-200 ml-auto"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <div className="ml-auto"></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wizardFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
}

export default SolutionWizard;
