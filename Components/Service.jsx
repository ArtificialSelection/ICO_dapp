import React from "react";

const Service = () => {
  const services = [
    {
      title: "Secure Storage",
      description:
        "Blockchain is the best place to securely store the open data",
    },
    {
      title: "Exchange Service",
      description: "The best exchange service in crypto",
    },
    {
      title: "Investment Project",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    },
    {
      title: "Credit Card",
      description: "You can also buy token directly through credit card",
    },
    {
      title: "Staking",
      description: "You can stake the project tokens and earn 3% annually",
    },
    {
      title: "Project Roadmap",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    },
  ];
  return (
    <section id="service" className="small_pb">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div className="title_default_light title_border text-center">
              <h4
                className="animation"
                data-animation="fadeInUp"
                data-animation-delay="0.2s"
              >
                Meet our solution for you
              </h4>
              <p
                className="animation"
                data-animation="fadeInUp"
                data-animation-delay="0.2s"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
                est? At vitae tempora sunt distinctio fuga vel natus eos
                cupiditate repellendus sint numquam obcaecati quos suscipit,
                iure soluta voluptatem rerum?
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {services.map((service, i) => (
            <div key={i + 1} className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="box_wrap text-center animation"
                data-animation="fadeInUp"
                data-animation-delay={`0.${i + 1}s`}
              >
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
