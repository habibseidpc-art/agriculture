import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { Sprout, Phone, Lock, User as UserIcon, MapPin, Wheat, ArrowRight, Sun, Moon, Globe } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '', phoneNumber: '', location: '', password: '', role: 'Farmer', farmType: '', farmerId: ''
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const { language, changeLanguage, t } = useContext(LanguageContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const finalData = { ...formData, farmerId: formData.farmerId || 'F-' + Math.floor(Math.random() * 10000) };
    const result = await register(finalData);
    if (result.success) {
      if (result.role === 'Farmer') navigate('/farmer');
      else navigate('/officer');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      {/* Top right toggles */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 50, display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={toggleTheme} className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%' }}>
          {isDarkMode ? <Sun size={20} color="var(--secondary)" /> : <Moon size={20} />}
        </button>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={20} color="var(--text-muted)" />
          <select 
            value={language} 
            onChange={(e) => changeLanguage(e.target.value)}
            style={{ background: 'transparent', color: 'var(--text-main)', border: 'none', fontWeight: '600', outline: 'none', cursor: 'pointer' }}
          >
            <option value="en">English</option>
            <option value="am">አማርኛ</option>
            <option value="om">Afaan Oromo</option>
          </select>
        </div>
      </div>

      <div className="auth-left" style={{ padding: '2rem' }}>
        <div className="auth-box glass-panel" style={{ maxWidth: '500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '0.75rem' }}>
              <Sprout size={28} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>AgriConnect</span>
          </div>
          
          <h2 style={{ marginBottom: '0.5rem' }}>{t('createAccount')}</h2>
          <p style={{ marginBottom: '1.5rem' }}>Join the community of modern farmers and experts.</p>
          
          {error && <div style={{ background: '#fef2f2', color: 'var(--danger)', padding: '0.875rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: '500' }}>{error}</div>}
          
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group" style={{ gridColumn: 'span 2', marginBottom: '0' }}>
              <label>{t('fullName')}</label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" name="fullName" className="input-field" style={{ paddingLeft: '2.75rem' }} value={formData.fullName} onChange={handleChange} placeholder="Abebe Kebede" required />
              </div>
            </div>
            
            <div className="input-group" style={{ marginBottom: '0' }}>
              <label>{t('phoneNumber')}</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" name="phoneNumber" className="input-field" style={{ paddingLeft: '2.75rem' }} value={formData.phoneNumber} onChange={handleChange} placeholder={t('placeholderPhone')} required />
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: '0' }}>
              <label>{t('location')}</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select name="location" className="input-field" style={{ paddingLeft: '2.75rem' }} value={formData.location} onChange={handleChange} required>
                  <option value="" disabled>{t('placeholderLocation')}</option>
                  <option value="Addis Ababa">Addis Ababa</option>
                  <option value="Oromia">Oromia</option>
                  <option value="Amhara">Amhara</option>
                  <option value="Tigray">Tigray</option>
                  <option value="SNNPR">SNNPR</option>
                  <option value="Sidama">Sidama</option>
                  <option value="Somali">Somali</option>
                  <option value="Afar">Afar</option>
                  <option value="Benishangul-Gumuz">Benishangul-Gumuz</option>
                  <option value="Gambela">Gambela</option>
                  <option value="Harari">Harari</option>
                  <option value="Dire Dawa">Dire Dawa</option>
                  <option value="SWEPR">SWEPR</option>
                </select>
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: '0' }}>
              <label>{t('role')}</label>
              <select name="role" className="input-field" value={formData.role} onChange={handleChange}>
                <option value="Farmer">{t('farmer')}</option>
                <option value="Extension Officer">{t('extensionOfficer')}</option>
              </select>
            </div>

            <div className="input-group" style={{ marginBottom: '0' }}>
              <label>{t('password')}</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="password" name="password" className="input-field" style={{ paddingLeft: '2.75rem' }} value={formData.password} onChange={handleChange} placeholder="••••••••" required />
              </div>
            </div>
            
            {formData.role === 'Farmer' && (
              <div className="input-group" style={{ gridColumn: 'span 2', marginBottom: '0' }}>
                <label>{t('farmType')}</label>
                <div style={{ position: 'relative' }}>
                  <Wheat size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <select name="farmType" className="input-field" style={{ paddingLeft: '2.75rem' }} value={formData.farmType} onChange={handleChange} required>
                    <option value="" disabled>{t('placeholderCrop')}</option>
                    <option value="Teff">Teff</option>
                    <option value="Coffee">Coffee</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Maize">Maize</option>
                    <option value="Sorghum">Sorghum</option>
                    <option value="Barley">Barley</option>
                    <option value="Sesame">Sesame</option>
                    <option value="Enset">Enset</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
              {t('createAccount')} <ArrowRight size={18} />
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '700' }}>{t('login')}</Link>
          </p>
        </div>
      </div>
      <div className="auth-right">
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '500px' }}>
          <h1 style={{ color: 'white', fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>
            {t('joinFuture')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.25rem', lineHeight: '1.6' }}>
            Get expert advice exactly when you need it. Protect your crops and increase your harvest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
