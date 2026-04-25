import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { Sprout, Phone, Lock, ArrowRight, Sun, Moon, Globe } from 'lucide-react';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const { language, changeLanguage, t } = useContext(LanguageContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(phoneNumber, password);
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

      <div className="auth-left">
        <div className="auth-box glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--primary)' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '0.75rem' }}>
              <Sprout size={28} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>AgriConnect</span>
          </div>
          
          <h2 style={{ marginBottom: '0.5rem' }}>{t('welcomeBack')}</h2>
          <p style={{ marginBottom: '2rem' }}>Enter your details to access your portal.</p>
          
          {error && <div style={{ background: '#fef2f2', color: 'var(--danger)', padding: '0.875rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: '500' }}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>{t('phoneNumber')}</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="input-field" 
                  style={{ paddingLeft: '2.75rem' }}
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  placeholder={t('placeholderPhone')}
                  required 
                />
              </div>
            </div>
            <div className="input-group">
              <label>{t('password')}</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="input-field" 
                  style={{ paddingLeft: '2.75rem' }}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  required 
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              {t('login')} <ArrowRight size={18} />
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '700' }}>{t('createAccount')}</Link>
          </p>
        </div>
      </div>
      <div className="auth-right">
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '500px' }}>
          <h1 style={{ color: 'white', fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>
            {t('empowering')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.25rem', lineHeight: '1.6' }}>
            Connect with expert extension officers to solve crop problems, improve yields, and grow your farm's potential.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
